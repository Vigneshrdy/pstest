import apiService from './api';
import {
  User,
  Account,
  Transaction,
  TransferRequest,
  TransferResponse,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  DashboardStats,
  SearchRequest,
  SearchResult,
  UploadResponse,
  PaginatedResponse
} from '@/types';

// Authentication Service
export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    return response.data!;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', data);
    return response.data!;
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/refresh', { refreshToken });
    return response.data!;
  },

  async logout(): Promise<void> {
    await apiService.post('/auth/logout');
  },

  async getProfile(): Promise<User> {
    const response = await apiService.get<User>('/auth/profile');
    return response.data!;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiService.put<User>('/auth/profile', data);
    return response.data!;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiService.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }
};

// Account Service
export const accountService = {
  async getAccounts(): Promise<Account[]> {
    const response = await apiService.get<Account[]>('/accounts');
    return response.data!;
  },

  async getAccount(accountId: string): Promise<Account> {
    const response = await apiService.get<Account>(`/accounts/${accountId}`);
    return response.data!;
  },

  async createAccount(data: {
    accountType: string;
    initialDeposit?: number;
  }): Promise<Account> {
    const response = await apiService.post<Account>('/accounts', data);
    return response.data!;
  },

  async updateAccount(accountId: string, data: Partial<Account>): Promise<Account> {
    const response = await apiService.put<Account>(`/accounts/${accountId}`, data);
    return response.data!;
  },

  async deactivateAccount(accountId: string): Promise<void> {
    await apiService.patch(`/accounts/${accountId}/deactivate`);
  },

  async getAccountBalance(accountId: string): Promise<{ balance: number; currency: string }> {
    const response = await apiService.get<{ balance: number; currency: string }>(`/accounts/${accountId}/balance`);
    return response.data!;
  }
};

// Transaction Service
export const transactionService = {
  async getTransactions(
    accountId?: string,
    page: number = 1,
    limit: number = 10,
    filters?: any
  ): Promise<PaginatedResponse<Transaction>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(accountId && { accountId }),
      ...(filters && Object.keys(filters).length > 0 && { ...filters })
    });

    const response = await apiService.get<Transaction[]>(`/transactions?${params}`);
    return response as PaginatedResponse<Transaction>;
  },

  async getTransaction(transactionId: string): Promise<Transaction> {
    const response = await apiService.get<Transaction>(`/transactions/${transactionId}`);
    return response.data!;
  },

  async transfer(transferData: TransferRequest): Promise<TransferResponse> {
    const response = await apiService.post<TransferResponse>('/transactions/transfer', transferData);
    return response.data!;
  },

  async deposit(accountId: string, amount: number, description?: string): Promise<Transaction> {
    const response = await apiService.post<Transaction>('/transactions/deposit', {
      accountId,
      amount,
      description
    });
    return response.data!;
  },

  async withdraw(accountId: string, amount: number, description?: string): Promise<Transaction> {
    const response = await apiService.post<Transaction>('/transactions/withdraw', {
      accountId,
      amount,
      description
    });
    return response.data!;
  },

  async getTransactionReceipt(transactionId: string): Promise<Blob> {
    const response = await apiService.get(`/transactions/${transactionId}/receipt`, {
      responseType: 'blob'
    });
    return response.data as Blob;
  },

  async cancelTransaction(transactionId: string, reason?: string): Promise<void> {
    await apiService.patch(`/transactions/${transactionId}/cancel`, { reason });
  }
};

// Analytics Service
export const analyticsService = {
  async getDashboardStats(accountId?: string): Promise<DashboardStats> {
    const params = accountId ? `?accountId=${accountId}` : '';
    const response = await apiService.get<DashboardStats>(`/analytics/dashboard${params}`);
    return response.data!;
  },

  async getSpendingAnalysis(
    accountId: string,
    period: 'week' | 'month' | 'quarter' | 'year' = 'month'
  ): Promise<any> {
    const response = await apiService.get(`/analytics/spending/${accountId}?period=${period}`);
    return response.data!;
  },

  async getTransactionTrends(
    accountId: string,
    period: 'month' | 'quarter' | 'year' = 'month'
  ): Promise<any> {
    const response = await apiService.get(`/analytics/trends/${accountId}?period=${period}`);
    return response.data!;
  },

  async exportTransactions(
    accountId: string,
    format: 'csv' | 'pdf' | 'excel' = 'csv',
    dateRange?: { start: string; end: string }
  ): Promise<Blob> {
    const params = new URLSearchParams({
      format,
      ...(dateRange && { startDate: dateRange.start, endDate: dateRange.end })
    });

    const response = await apiService.get(`/analytics/export/${accountId}?${params}`, {
      responseType: 'blob'
    });
    return response.data as Blob;
  }
};

// Search Service
export const searchService = {
  async searchTransactions(searchRequest: SearchRequest): Promise<SearchResult<Transaction>> {
    const response = await apiService.post<SearchResult<Transaction>>('/search/transactions', searchRequest);
    return response.data!;
  },

  async searchAccounts(query: string): Promise<SearchResult<Account>> {
    const response = await apiService.get<SearchResult<Account>>(`/search/accounts?q=${encodeURIComponent(query)}`);
    return response.data!;
  },

  async getSearchSuggestions(query: string, type: 'transactions' | 'accounts' = 'transactions'): Promise<string[]> {
    const response = await apiService.get<string[]>(`/search/suggestions?q=${encodeURIComponent(query)}&type=${type}`);
    return response.data!;
  }
};

// File Upload Service
export const fileService = {
  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    const response = await apiService.uploadFile<UploadResponse>('/upload', file, onProgress);
    return response.data!;
  },

  async getFile(fileId: string): Promise<any> {
    const response = await apiService.get(`/files/${fileId}`);
    return response.data!;
  },

  async downloadFile(fileId: string, filename: string): Promise<void> {
    await apiService.downloadFile(`/files/${fileId}/download`, filename);
  },

  async deleteFile(fileId: string): Promise<void> {
    await apiService.delete(`/files/${fileId}`);
  },

  async getFilesByUser(userId?: string): Promise<any[]> {
    const params = userId ? `?userId=${userId}` : '';
    const response = await apiService.get<any[]>(`/files${params}`);
    return response.data!;
  }
};

// Notification Service
export const notificationService = {
  async getNotifications(page: number = 1, limit: number = 10): Promise<PaginatedResponse<any>> {
    const response = await apiService.get<any[]>(`/notifications?page=${page}&limit=${limit}`);
    return response as PaginatedResponse<any>;
  },

  async markAsRead(notificationId: string): Promise<void> {
    await apiService.patch(`/notifications/${notificationId}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await apiService.patch('/notifications/read-all');
  },

  async deleteNotification(notificationId: string): Promise<void> {
    await apiService.delete(`/notifications/${notificationId}`);
  },

  async getNotificationSettings(): Promise<any> {
    const response = await apiService.get('/notifications/settings');
    return response.data!;
  },

  async updateNotificationSettings(settings: any): Promise<any> {
    const response = await apiService.put('/notifications/settings', settings);
    return response.data!;
  }
};

// Admin Service (for admin users)
export const adminService = {
  async getAllUsers(page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> {
    const response = await apiService.get<User[]>(`/admin/users?page=${page}&limit=${limit}`);
    return response as PaginatedResponse<User>;
  },

  async getUserDetails(userId: string): Promise<User> {
    const response = await apiService.get<User>(`/admin/users/${userId}`);
    return response.data!;
  },

  async updateUserStatus(userId: string, isActive: boolean): Promise<User> {
    const response = await apiService.patch<User>(`/admin/users/${userId}/status`, { isActive });
    return response.data!;
  },

  async getSystemStats(): Promise<any> {
    const response = await apiService.get('/admin/stats');
    return response.data!;
  },

  async getAuditLogs(page: number = 1, limit: number = 10): Promise<PaginatedResponse<any>> {
    const response = await apiService.get<any[]>(`/admin/audit-logs?page=${page}&limit=${limit}`);
    return response as PaginatedResponse<any>;
  }
};

export {
  apiService
};