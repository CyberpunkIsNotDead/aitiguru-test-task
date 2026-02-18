import React from 'react';

import styles from './SearchInput.module.scss';

import SearchIcon from '@/assets/icons/search.svg?react';
import { Input } from '@/shared/ui/Input';

interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value'
> {
  placeholder?: string;
  value?: string | number;
}

const SearchInput = ({ placeholder, value, ...props }: SearchInputProps) => {
  return (
    <Input
      {...props}
      value={value}
      placeholder={placeholder}
      variant='grey'
      className={styles['search-input']}
      prepend={<SearchIcon className={styles['icon-search']} />}
    />
  );
};

export { SearchInput };
