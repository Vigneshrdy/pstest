const mongoose = require('mongoose');
const { generateAccountNumber } = require('../utils/crypto');

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  accountType: {
    type: String,
    required: [true, 'Account type is required'],
    enum: ['savings', 'checking', 'business', 'investment'],
    default: 'checking'
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Balance cannot be negative'],
    set: v => Math.round(v * 100) / 100 // Round to 2 decimal places
  },
  availableBalance: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Available balance cannot be negative'],
    set: v => Math.round(v * 100) / 100
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
    uppercase: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  dailyLimit: {
    type: Number,
    default: 10000,
    min: [0, 'Daily limit cannot be negative']
  },
  monthlyLimit: {
    type: Number,
    default: 100000,
    min: [0, 'Monthly limit cannot be negative']
  },
  minimumBalance: {
    type: Number,
    default: 1000,
    min: [0, 'Minimum balance cannot be negative']
  },
  interestRate: {
    type: Number,
    default: 0.02, // 2% annual interest
    min: [0, 'Interest rate cannot be negative'],
    max: [1, 'Interest rate cannot exceed 100%']
  },
  lastInterestCalculation: {
    type: Date,
    default: Date.now
  },
  overdraftLimit: {
    type: Number,
    default: 0,
    min: [0, 'Overdraft limit cannot be negative']
  },
  overdraftUsed: {
    type: Number,
    default: 0,
    min: [0, 'Overdraft used cannot be negative']
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['active', 'suspended', 'closed', 'frozen'],
      required: true
    },
    reason: String,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    changedAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    openingDeposit: Number,
    closingReason: String,
    closingDate: Date,
    lastTransactionDate: Date,
    transactionCount: { type: Number, default: 0 },
    totalCredits: { type: Number, default: 0 },
    totalDebits: { type: Number, default: 0 }
  },
  notifications: {
    lowBalance: {
      enabled: { type: Boolean, default: true },
      threshold: { type: Number, default: 100 }
    },
    largeTransaction: {
      enabled: { type: Boolean, default: true },
      threshold: { type: Number, default: 1000 }
    }
  },
  tags: [String] // For categorization and search
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for account display name
accountSchema.virtual('displayName').get(function() {
  return `${this.accountType.charAt(0).toUpperCase() + this.accountType.slice(1)} Account (${this.accountNumber.slice(-4)})`;
});

// Virtual for available overdraft
accountSchema.virtual('availableOverdraft').get(function() {
  return this.overdraftLimit - this.overdraftUsed;
});

// Virtual for total available funds
accountSchema.virtual('totalAvailable').get(function() {
  return this.availableBalance + this.availableOverdraft;
});

// Indexes
accountSchema.index({ userId: 1, accountType: 1 });
accountSchema.index({ accountNumber: 1 }, { unique: true });
accountSchema.index({ balance: 1 });
accountSchema.index({ createdAt: -1 });
accountSchema.index({ isActive: 1 });
accountSchema.index({ 'metadata.lastTransactionDate': -1 });

// Pre-save middleware
accountSchema.pre('save', async function(next) {
  // Generate account number if not provided
  if (this.isNew && !this.accountNumber) {
    let accountNumber;
    let exists = true;
    
    // Generate unique account number
    while (exists) {
      accountNumber = generateAccountNumber();
      exists = await this.constructor.findOne({ accountNumber });
    }
    
    this.accountNumber = accountNumber;
  }

  // Ensure available balance doesn't exceed actual balance
  if (this.availableBalance > this.balance) {
    this.availableBalance = this.balance;
  }

  // Update primary account logic
  if (this.isPrimary && this.isModified('isPrimary')) {
    // Set all other accounts for this user as non-primary
    await this.constructor.updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { isPrimary: false }
    );
  }

  next();
});

// Instance method to check if account can be debited
accountSchema.methods.canDebit = function(amount) {
  const totalAvailable = this.availableBalance + this.availableOverdraft;
  return totalAvailable >= amount;
};

// Instance method to update balance
accountSchema.methods.updateBalance = function(amount, type = 'credit') {
  if (type === 'credit') {
    this.balance += amount;
    this.availableBalance += amount;
    this.metadata.totalCredits += amount;
  } else if (type === 'debit') {
    if (!this.canDebit(amount)) {
      throw new Error('Insufficient funds');
    }
    
    this.balance -= amount;
    this.availableBalance -= amount;
    this.metadata.totalDebits += amount;
    
    // Handle overdraft if balance goes negative
    if (this.balance < 0) {
      this.overdraftUsed = Math.abs(this.balance);
      this.balance = 0;
    }
  }
  
  this.metadata.transactionCount += 1;
  this.metadata.lastTransactionDate = new Date();
  
  return this.save();
};

// Instance method to freeze/hold funds
accountSchema.methods.holdFunds = function(amount) {
  if (this.availableBalance < amount) {
    throw new Error('Insufficient available balance for hold');
  }
  
  this.availableBalance -= amount;
  return this.save();
};

// Instance method to release held funds
accountSchema.methods.releaseFunds = function(amount) {
  this.availableBalance += amount;
  
  // Ensure available balance doesn't exceed actual balance
  if (this.availableBalance > this.balance) {
    this.availableBalance = this.balance;
  }
  
  return this.save();
};

// Instance method to calculate interest
accountSchema.methods.calculateInterest = function() {
  const now = new Date();
  const lastCalculation = this.lastInterestCalculation;
  const daysDiff = Math.floor((now - lastCalculation) / (1000 * 60 * 60 * 24));
  
  if (daysDiff > 0 && this.balance > 0) {
    const dailyRate = this.interestRate / 365;
    const interest = this.balance * dailyRate * daysDiff;
    
    this.balance += interest;
    this.availableBalance += interest;
    this.lastInterestCalculation = now;
    this.metadata.totalCredits += interest;
    
    return interest;
  }
  
  return 0;
};

// Static method to find by account number
accountSchema.statics.findByAccountNumber = function(accountNumber) {
  return this.findOne({ accountNumber, isActive: true });
};

// Static method to find user accounts
accountSchema.statics.findUserAccounts = function(userId) {
  return this.find({ userId, isActive: true }).sort({ isPrimary: -1, createdAt: -1 });
};

// Static method to get account statistics
accountSchema.statics.getAccountStats = function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId), isActive: true } },
    {
      $group: {
        _id: null,
        totalAccounts: { $sum: 1 },
        totalBalance: { $sum: '$balance' },
        totalAvailable: { $sum: '$availableBalance' },
        accountTypes: { $addToSet: '$accountType' }
      }
    }
  ]);
};

module.exports = mongoose.model('Account', accountSchema);