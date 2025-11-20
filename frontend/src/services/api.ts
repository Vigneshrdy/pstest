import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiError } from '@/types';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp
        config.headers['X-Request-Time'] = new Date().toISOString();

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh token
            await this.refreshToken();
            
            // Retry the original request with new token
            const newToken = this.getToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            this.handleAuthFailure();
          }
        }

        // Transform error to ApiError format
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          status: error.response?.status || 500,
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          details: error.response?.data?.errors || {}
        };

        return Promise.reject(apiError);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    }
    return null;
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token')
      : null;

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post('/auth/refresh', {
        refreshToken
      }, {
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      });

      const { token, refreshToken: newRefreshToken } = response.data.data;

      // Update tokens in storage
      if (typeof window !== 'undefined') {
        const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage;
        storage.setItem('auth_token', token);
        storage.setItem('refresh_token', newRefreshToken);
      }
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  private handleAuthFailure(): void {
    // Clear tokens
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('refresh_token');
      
      // Redirect to login page
      window.location.href = '/auth/login';
    }
  }

  // Generic request methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // File upload method
  async uploadFile<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    };

    const response = await this.axiosInstance.post<ApiResponse<T>>(url, formData, config);
    return response.data;
  }

  // Download file method
  async downloadFile(url: string, filename: string): Promise<void> {
    const response = await this.axiosInstance.get(url, {
      responseType: 'blob',
    });

    // Create blob link to download
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.click();
    
    // Clean up
    window.URL.revokeObjectURL(downloadUrl);
    link.remove();
  }

  // Get axios instance for custom requests
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;