import React, { forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  variant?: 'default' | 'darker';
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    return (
      <div className={`${styles['checkbox-container']} ${className}`}>
        <CheckboxPrimitive.Root
          ref={ref}
          className={`${styles['checkbox']} ${styles[`checkbox-${variant}`]}`}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={styles['checkbox-indicator']}>
            <svg width={14} height={10} viewBox='0 0 14 10' fill='none'>
              <path
                d='M1 5L5 9L13 1'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {children && <span className={styles['label']}>{children}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
