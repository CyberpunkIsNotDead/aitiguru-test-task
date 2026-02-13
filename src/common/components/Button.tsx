import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styles from '@/common/components/Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, children, className = '', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp className={`${styles.button} ${className}`} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Button;
