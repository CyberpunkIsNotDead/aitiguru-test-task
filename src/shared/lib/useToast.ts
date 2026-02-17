import { useState } from 'react';

interface ToastState {
  open: boolean;
  title: string;
  description?: string;
  variant?: 'default' | 'error' | 'success';
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    title: '',
    description: '',
    variant: 'default',
  });

  const showToast = (
    title: string,
    description?: string,
    variant: 'default' | 'error' | 'success' = 'default'
  ) => {
    setToast({
      open: true,
      title,
      description,
      variant,
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 5000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
};
