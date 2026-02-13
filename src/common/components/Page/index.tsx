import React from 'react';
import Card from '../Card';
import styles from './Page.module.scss';

interface PageProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Page = ({ header, children }: PageProps) => {
  return (
    <div className={styles.page}>
      {header && (
        <div className={styles.header}>
          <Card>{header}</Card>
        </div>
      )}
      <div className={styles.content}>
        <Card fillSpace>{children}</Card>
      </div>
    </div>
  );
};

export default Page;
