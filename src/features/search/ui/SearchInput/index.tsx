import React from 'react';
import Input from '@/shared/ui/Input';
import SearchIcon from '@/assets/icons/search.svg?react';
import styles from './SearchInput.module.scss';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const SearchInput = ({ placeholder, ...props }: SearchInputProps) => {
  return (
    <Input
      {...props}
      placeholder={placeholder}
      variant='grey'
      prepend={<SearchIcon className={styles['icon-search']} />}
    />
  );
};

export default SearchInput;
