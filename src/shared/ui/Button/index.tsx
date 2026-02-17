import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'opaque' | 'white';
  isSquare?: true;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'default', className = '', isSquare, ...props },
    ref
  ) => {
    const buttonClassName = classNames({
      [styles.button]: true,
      [styles[`button-${variant}`]]: variant,
      [className]: className,
      [styles['button-square']]: isSquare,
    });

    return (
      <button className={buttonClassName} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
