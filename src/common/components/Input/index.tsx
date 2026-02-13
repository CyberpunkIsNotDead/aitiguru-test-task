import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'grey';
  asChild?: boolean;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      asChild = false,
      prepend,
      append,
      className = '',
      ...props
    },
    ref
  ) => {
    const InputComponent = asChild ? Slot : 'input';

    const inputElement = (
      <InputComponent
        className={styles['input-element']}
        ref={ref}
        {...props}
      />
    );

    const wrapperClassName = `${styles['input-wrapper']} ${variant !== 'default' ? styles[`input-wrapper--${variant}`] : ''} ${className}`;

    return (
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
    );
  }
);

Input.displayName = 'Input';

export default Input;
