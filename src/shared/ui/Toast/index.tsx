import * as Toast from '@radix-ui/react-toast';

import styles from './Toast.module.scss';

interface ToastProps {
  title: string;
  description?: string;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  variant?: 'default' | 'error' | 'success';
}

const ToastComponent = ({
  title,
  description,
  open,
  onOpenChange,
  variant = 'default',
}: ToastProps) => {
  return (
    <Toast.Provider swipeDirection='right'>
      <Toast.Root
        className={`${styles['toast-root']} ${styles[variant]}`}
        open={open}
        onOpenChange={onOpenChange}
      >
        <div className={styles['toast-content']}>
          <Toast.Title className={styles['toast-title']}>{title}</Toast.Title>
          {description && (
            <Toast.Description className={styles['toast-description']}>
              {description}
            </Toast.Description>
          )}
        </div>
        <Toast.Close className={styles['toast-close']} aria-label='Close'>
          ×
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className={styles['toast-viewport']} />
    </Toast.Provider>
  );
};

export default ToastComponent;
