import React from 'react';

import styles from './Card.module.scss';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  fillSpace?: boolean;
}

const Card = ({ children, fillSpace = false, ...props }: CardProps) => {
  return (
    <div
      className={`${styles.card} ${fillSpace ? styles['card-fill'] : ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
