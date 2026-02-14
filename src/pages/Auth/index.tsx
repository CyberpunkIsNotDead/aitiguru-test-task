import { Link } from 'react-router-dom';
import LoginInput from '@/features/user/ui/LoginInput';
import PasswordInput from '@/features/user/ui/PasswordInput';
import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import Page from '@/shared/ui/Page';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <Page>
      <div className={styles['auth-content']}>
        <LoginInput />
        <PasswordInput />

        <div className={styles['checkboxes']}>
          <Checkbox variant='default'>Remember me</Checkbox>
          <Checkbox variant='darker'>I agree to terms</Checkbox>
        </div>

        <div className={styles['navigation']}>
          <Link to='/'>
            <Button>Back to Main</Button>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default Auth;
