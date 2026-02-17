import React from 'react';
import styles from './Line.module.scss';

const Line = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`${styles.line} ${className}`} {...props}></div>;
};

export { Line };
