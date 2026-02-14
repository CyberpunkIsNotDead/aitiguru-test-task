import React, { useState, useRef } from 'react';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import LockIcon from '@/assets/icons/lock.svg?react';
import EyeOffIcon from '@/assets/icons/eyeOff.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';

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
  const [internalValue, setInternalValue] = useState(controlledValue || '');
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
  const currentValue =
    controlledValue !== undefined ? controlledValue : internalValue;

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
          <LockIcon width={20} height={20} style={{ color: 'currentColor' }} />
        </div>
      }
      append={
        <>
          <Button variant='opaque' onClick={clearInput}>
            <CloseIcon style={{ color: 'currentColor' }} />
          </Button>
          <Button variant='opaque' onClick={togglePasswordVisibility}>
            <EyeOffIcon style={{ color: 'currentColor' }} />
          </Button>
        </>
      }
    />
  );
};

export default PasswordInput;
