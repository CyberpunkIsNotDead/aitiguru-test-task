import React, { useState, useEffect } from 'react';
import Card from '../Card';
import styles from './Page.module.scss';

interface PageProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Page = ({ header, children }: PageProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!header) return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 22.5;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [header]);

  return (
    <div className={styles.page}>
      {header && (
        <div
          className={`${styles.header} ${scrolled ? styles['header-collapsed'] : ''}`}
        >
          <Card>
            <div className={styles['max-width-wrapper']}>
              <div className={styles['content-wrapper']}>{header}</div>
            </div>
          </Card>
        </div>
      )}
      <div className={styles.content}>
        <Card fillSpace>
          <div className={styles['max-width-wrapper']}>
            <div className={styles['content-wrapper']}>{children}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
