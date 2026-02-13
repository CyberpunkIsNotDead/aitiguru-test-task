import { Link } from 'react-router-dom';
import PasswordInput from '@/features/components/PasswordInput';
import Button from '@/common/components/Button';
import Checkbox from '@/common/components/Checkbox';
import Page from '@/common/components/Page';
import styles from './Auth.module.scss';

const Auth = () => {
  return (
    <Page>
      <div className={styles['auth-content']}>
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
