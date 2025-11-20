'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';
import { SocketEvent, TransactionNotification, BalanceUpdate } from '@/types';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  subscribeToAccount: (accountId: string) => void;
  unsubscribeFromAccount: (accountId: string) => void;
  emit: (event: string, data: any) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated, token, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token && user) {
      // Initialize socket connection
      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling']
      });

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        setIsConnected(true);
        toast.success('Connected to real-time updates');
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
        toast.error('Disconnected from real-time updates');
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setIsConnected(false);
        toast.error('Failed to connect to real-time updates');
      });

      // Transaction-related events
      newSocket.on('transaction_created', (data: TransactionNotification) => {
        console.log('New transaction:', data);
        toast.success(`New transaction: ${data.transaction.type} of $${data.transaction.amount}`);
        
        // You can trigger a refetch of transactions here
        // or update the transaction store directly
      });

      newSocket.on('transaction_updated', (data: TransactionNotification) => {
        console.log('Transaction updated:', data);
        
        if (data.transaction.status === 'completed') {
          toast.success(`Transaction ${data.transaction.transactionId} completed`);
        } else if (data.transaction.status === 'failed') {
          toast.error(`Transaction ${data.transaction.transactionId} failed`);
        }
      });

      newSocket.on('balance_updated', (data: BalanceUpdate) => {
        console.log('Balance updated:', data);
        toast.success(`Account balance updated: $${data.newBalance}`);
      });

      // Security events
      newSocket.on('security_alert', (data: any) => {
        console.log('Security alert:', data);
        toast.error(`Security Alert: ${data.message}`, { duration: 10000 });
      });

      // System notifications
      newSocket.on('system_notification', (data: any) => {
        console.log('System notification:', data);
        
        const toastType = data.type || 'info';
        const message = data.message || 'System notification';
        
        switch (toastType) {
          case 'success':
            toast.success(message);
            break;
          case 'error':
            toast.error(message);
            break;
          case 'warning':
            toast(message, { icon: '⚠️' });
            break;
          default:
            toast(message);
        }
      });

      // Account events
      newSocket.on('account_status_changed', (data: any) => {
        console.log('Account status changed:', data);
        
        if (data.status === 'blocked') {
          toast.error('Your account has been blocked. Please contact support.');
        } else if (data.status === 'active') {
          toast.success('Your account is now active.');
        }
      });

      // Fraud detection alerts
      newSocket.on('fraud_alert', (data: any) => {
        console.log('Fraud alert:', data);
        toast.error(`Fraud Alert: ${data.message}. Transaction blocked for security.`, {
          duration: 10000
        });
      });

      setSocket(newSocket);

      // Cleanup on unmount or auth change
      return () => {
        console.log('Cleaning up socket connection');
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
      };
    } else {
      // Clean up socket when user logs out
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [isAuthenticated, token, user]);

  const subscribeToAccount = (accountId: string) => {
    if (socket && isConnected) {
      socket.emit('subscribe_transactions', accountId);
      console.log(`Subscribed to account ${accountId} transactions`);
    }
  };

  const unsubscribeFromAccount = (accountId: string) => {
    if (socket && isConnected) {
      socket.emit('unsubscribe_transactions', accountId);
      console.log(`Unsubscribed from account ${accountId} transactions`);
    }
  };

  const emit = (event: string, data: any) => {
    if (socket && isConnected) {
      socket.emit(event, data);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  };

  const value: SocketContextType = {
    socket,
    isConnected,
    subscribeToAccount,
    unsubscribeFromAccount,
    emit,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket(): SocketContextType {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

// Custom hook for account-specific socket events
export function useAccountSocket(accountId: string | null) {
  const { subscribeToAccount, unsubscribeFromAccount, isConnected } = useSocket();

  useEffect(() => {
    if (accountId && isConnected) {
      subscribeToAccount(accountId);
      
      return () => {
        unsubscribeFromAccount(accountId);
      };
    }
  }, [accountId, isConnected, subscribeToAccount, unsubscribeFromAccount]);

  return { isConnected };
}

// Custom hook for listening to specific socket events
export function useSocketEvent<T = any>(
  eventName: string,
  handler: (data: T) => void,
  deps: any[] = []
) {
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on(eventName, handler);
      
      return () => {
        socket.off(eventName, handler);
      };
    }
  }, [socket, eventName, ...deps]);
}