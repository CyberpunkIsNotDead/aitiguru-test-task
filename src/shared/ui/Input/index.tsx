import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'grey';
  asChild?: boolean;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { variant = 'default', prepend, append, label, className = '', ...props },
    ref
  ) => {
    const inputElement = (
      <input className={styles['input-element']} ref={ref} {...props} />
    );

    const wrapperClassName = `${styles['input-wrapper']} ${variant !== 'default' ? styles[`input-wrapper-${variant}`] : ''} ${className}`;

    return (
      <div className={styles['label-wrapper']}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={wrapperClassName}>
          {prepend && (
            <div className={styles.prepend}>
              <Slot>{prepend}</Slot>
            </div>
          )}
          {inputElement}
          {append && (
            <div className={styles.append}>
              <Slot>{append}</Slot>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
