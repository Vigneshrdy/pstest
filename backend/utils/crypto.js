const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Hash password using bcrypt
 */
const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare password with hash
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Generate JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
  });
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Verify refresh token
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

/**
 * Generate secure random string
 */
const generateSecureRandom = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Generate account number
 */
const generateAccountNumber = () => {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(4).toString('hex');
  return `ACC${timestamp.slice(-6)}${random.toUpperCase()}`;
};

/**
 * Generate transaction ID
 */
const generateTransactionId = () => {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(6).toString('hex');
  return `TXN${timestamp}${random.toUpperCase()}`;
};

/**
 * Mask sensitive data
 */
const maskAccountNumber = (accountNumber) => {
  if (!accountNumber || accountNumber.length < 4) return accountNumber;
  return accountNumber.slice(0, 4) + '*'.repeat(accountNumber.length - 8) + accountNumber.slice(-4);
};

/**
 * Mask email
 */
const maskEmail = (email) => {
  if (!email) return email;
  const [username, domain] = email.split('@');
  if (username.length <= 2) return email;
  return username.slice(0, 2) + '*'.repeat(username.length - 2) + '@' + domain;
};

/**
 * Validate password strength
 */
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: errors.length === 0 ? 'strong' : errors.length <= 2 ? 'medium' : 'weak'
  };
};

/**
 * Generate OTP
 */
const generateOTP = (length = 6) => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Sanitize input data
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Format currency amount
 */
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Validate amount format
 */
const validateAmount = (amount) => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount > 0 && numAmount <= 999999999.99;
};

/**
 * Generate API key
 */
const generateApiKey = () => {
  return 'bk_' + crypto.randomBytes(32).toString('hex');
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  generateSecureRandom,
  generateAccountNumber,
  generateTransactionId,
  maskAccountNumber,
  maskEmail,
  validatePasswordStrength,
  generateOTP,
  sanitizeInput,
  formatCurrency,
  validateAmount,
  generateApiKey
};