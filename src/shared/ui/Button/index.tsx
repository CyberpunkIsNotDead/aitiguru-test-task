import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'opaque' | 'white' | 'pagination';
  isSquare?: true;
  isActive?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      className = '',
      isSquare,
      type = 'button',
      isActive,
      ...props
    },
    ref
  ) => {
    const buttonClassName = classNames(
      styles.button,
      styles[`button-${variant}`],
      isActive && styles.active,
      className,
      isSquare && styles['button-square']
    );

    return (
      <button className={buttonClassName} ref={ref} type={type} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
