import styles from './Loader.module.scss';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader = ({ size = 'medium', color }: LoaderProps) => {
  return (
    <div className={styles['loader-container']}>
      <div
        className={`${styles['spinner']} ${styles[`spinner-${size}`]}`}
        style={color ? { borderTopColor: color } : undefined}
      />
    </div>
  );
};

export default Loader;
