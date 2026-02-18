import React from 'react';

import styles from './SearchInput.module.scss';

import SearchIcon from '@/assets/icons/search.svg?react';
import { Input } from '@/shared/ui/Input';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const SearchInput = ({ placeholder, ...props }: SearchInputProps) => {
  return (
    <Input
      {...props}
      placeholder={placeholder}
      variant='grey'
      className={styles['search-input']}
      prepend={<SearchIcon className={styles['icon-search']} />}
    />
  );
};

export { SearchInput };
