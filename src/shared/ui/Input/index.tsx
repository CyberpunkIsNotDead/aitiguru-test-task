import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import React from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'grey';
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

    const componentWrapperClassname = classNames(
      styles['component-wrapper'],
      className
    );

    const inputWrapperClassName = classNames(
      styles['input-wrapper'],
      styles[`input-wrapper-${variant}`]
    );

    return (
      <div className={componentWrapperClassname}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={inputWrapperClassName}>
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

export { Input };
