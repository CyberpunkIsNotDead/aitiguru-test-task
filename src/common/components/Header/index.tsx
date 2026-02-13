import React from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  children: React.ReactNode;
  text: string;
}

const Header = ({ children, text }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles['header-text']}>{text}</div>
      <div className={styles['header-content']}>{children}</div>
    </div>
  );
};

export default Header;
