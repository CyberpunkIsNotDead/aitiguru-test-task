import React, { useState, useRef } from 'react';

import styles from './PasswordInput.module.scss';

import CloseIcon from '@/assets/icons/close.svg?react';
import EyeOffIcon from '@/assets/icons/eyeOff.svg?react';
import LockIcon from '@/assets/icons/lock.svg?react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  placeholder?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

const PasswordInput = ({
  placeholder = 'Пароль',
  value: controlledValue,
  onChange,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearInput = () => {
    const newValue = '';
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
    // Also clear the actual input element if it exists
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Use internal value if not controlled, otherwise use controlled value
  const currentValue = controlledValue ?? internalValue;

  return (
    <Input
      {...props}
      ref={inputRef}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={currentValue}
      onChange={handleChange}
      prepend={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LockIcon width={20} height={20} className={styles['icon-lock']} />
        </div>
      }
      append={
        <>
          <Button variant='opaque' onClick={clearInput}>
            <CloseIcon className={styles['icon-close']} />
          </Button>
          <Button variant='opaque' onClick={togglePasswordVisibility}>
            <EyeOffIcon className={styles['icon-eye-off']} />
          </Button>
        </>
      }
      label='Пароль'
    />
  );
};

export { PasswordInput };
