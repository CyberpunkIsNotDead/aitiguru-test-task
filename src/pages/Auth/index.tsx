import { Link } from 'react-router-dom';
import PasswordInput from './components/PasswordInput';
import Button from '@/common/components/Button';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <div className={styles.auth}>
      <PasswordInput />
      <div className={styles.navigation}>
        <Link to='/'>
          <Button>Back to Main</Button>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
