import React, { useState, useRef } from 'react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import UserIcon from '@/assets/icons/user.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import styles from './LoginInput.module.scss';

interface LoginInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  placeholder?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

const LoginInput = ({
  placeholder = 'Логин',
  value: controlledValue,
  onChange,
  ...props
}: LoginInputProps) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

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
      placeholder={placeholder}
      value={currentValue}
      onChange={handleChange}
      prepend={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserIcon width={20} height={20} className={styles['icon-user']} />
        </div>
      }
      append={
        <Button variant='opaque' onClick={clearInput}>
          <CloseIcon className={styles['icon-close']} />
        </Button>
      }
      label='Логин'
    />
  );
};

export { LoginInput };
