import { useState, useRef } from 'react';

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

  const timeoutIdRef = useRef<number | null>(null);

  const showToast = (
    title: string,
    description?: string,
    variant: 'default' | 'error' | 'success' = 'default'
  ) => {
    // Clear any existing timeout
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    setToast({
      open: true,
      title,
      description,
      variant,
    });

    // Auto-hide after 5 seconds
    timeoutIdRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 5000);
  };

  const hideToast = () => {
    // Clear timeout if manually hiding
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    setToast((prev) => ({ ...prev, open: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
};
