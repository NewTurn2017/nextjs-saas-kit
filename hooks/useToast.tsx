'use client';

import { toast } from 'sonner';

export function useToast() {
  const success = (message: string) => {
    toast.success(message);
  };

  const error = (message: string) => {
    toast.error(message);
  };

  const info = (message: string) => {
    toast.info(message);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    toast[type](message);
  };

  // For compatibility with existing code
  const toasts = [];
  const removeToast = () => {};

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
  };
}