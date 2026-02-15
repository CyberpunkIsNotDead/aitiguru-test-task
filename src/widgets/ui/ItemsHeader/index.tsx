import Header from '@/shared/ui/Header';
import styles from './ItemsHeader.module.scss';
import type React from 'react';

interface ItemsHeaderProps {
  children?: React.ReactNode;
  controls?: React.ReactNode;
  text?: string;
}

const ItemsHeader = ({ text, children, controls }: ItemsHeaderProps) => {
  return (
    <Header>
      <>
        {text && <div className={styles['header-text']}>{text}</div>}

        {children && <div className={styles['header-content']}>{children}</div>}

        {controls && (
          <div className={styles['header-controls']}>{controls}</div>
        )}
      </>
    </Header>
  );
};

export default ItemsHeader;
