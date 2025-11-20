// User Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: Address;
  kycStatus: 'pending' | 'verified' | 'rejected';
  role: 'customer' | 'admin' | 'manager';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Account Types
export interface Account {
  _id: string;
  accountNumber: string;
  accountType: 'savings' | 'checking' | 'business' | 'investment';
  balance: number;
  currency: string;
  userId: string;
  isActive: boolean;
  dailyLimit: number;
  monthlyLimit: number;
  createdAt: string;
  updatedAt: string;
}

// Transaction Types
export interface Transaction {
  _id: string;
  transactionId: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  amount: number;
  currency: string;
  fromAccount?: string;
  toAccount?: string;
  description?: string;
  category?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  metadata?: TransactionMetadata;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
}

export interface TransactionMetadata {
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  deviceId?: string;
  riskScore?: number;
}

// Transfer Types
export interface TransferRequest {
  fromAccountId: string;
  toAccountNumber: string;
  amount: number;
  description?: string;
  category?: string;
  scheduledAt?: string;
}

export interface TransferResponse {
  transaction: Transaction;
  balance: number;
  message: string;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  timestamp: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

// Analytics Types
export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  transactionCount: number;
  accounts: Account[];
  recentTransactions: Transaction[];
  monthlySpending: MonthlySpending[];
  categorySpending: CategorySpending[];
}

export interface MonthlySpending {
  month: string;
  income: number;
  expenses: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  transactions: number;
}

// File Upload Types
export interface FileUpload {
  _id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  uploadedBy: string;
  uploadedAt: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface UploadResponse {
  file: FileUpload;
  url: string;
}

// Search Types
export interface SearchRequest {
  query: string;
  filters?: SearchFilters;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface SearchFilters {
  type?: string[];
  status?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  category?: string[];
}

export interface SearchResult<T = any> {
  hits: T[];
  total: number;
  aggregations?: Record<string, any>;
}

// Real-time Events
export interface SocketEvent<T = any> {
  type: string;
  payload: T;
  timestamp: string;
  userId?: string;
  accountId?: string;
}

export interface TransactionNotification {
  transaction: Transaction;
  account: Account;
  newBalance: number;
  message: string;
}

export interface BalanceUpdate {
  accountId: string;
  newBalance: number;
  previousBalance: number;
  timestamp: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: string;
  acceptTerms: boolean;
}

export interface TransferFormData {
  toAccountNumber: string;
  amount: string;
  description: string;
  category: string;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Component Props Types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Store Types (Zustand)
export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export interface AccountStore {
  accounts: Account[];
  currentAccount: Account | null;
  isLoading: boolean;
  fetchAccounts: () => Promise<void>;
  setCurrentAccount: (account: Account) => void;
  updateAccountBalance: (accountId: string, balance: number) => void;
}

export interface TransactionStore {
  transactions: Transaction[];
  isLoading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  fetchTransactions: (accountId?: string, page?: number) => Promise<void>;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transactionId: string, updates: Partial<Transaction>) => void;
}

// Configuration Types
export interface AppConfig {
  apiBaseUrl: string;
  socketUrl: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  maxFileSize: number;
  allowedFileTypes: string[];
  features: {
    transfers: boolean;
    fileUploads: boolean;
    analytics: boolean;
    notifications: boolean;
  };
}