import React from 'react';
import Input from '@/common/components/Input';
import SearchIcon from '@/assets/icons/search.svg';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const SearchInput = ({ placeholder, ...props }: SearchInputProps) => {
  return (
    <Input
      {...props}
      placeholder={placeholder}
      variant='grey'
      prepend={<img src={SearchIcon} alt='Search' width='24' height='24' />}
    />
  );
};

export default SearchInput;
