import { Link } from 'react-router-dom';
import LoginInput from '@/features/user/ui/LoginInput';
import PasswordInput from '@/features/user/ui/PasswordInput';
import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import Page from '@/shared/ui/Page';
import styles from './Auth.module.scss';
import Line from '@/shared/ui/Line';

const Auth = () => {
  return (
    <Page>
      <div className={styles['auth-content-wrapper']}>
        <div className={styles['auth-content']}>
          <div className={styles['auth-logo-wrapper']}>
            <img src='/icons/logo.svg' />
          </div>

          <h1 className={styles['auth-header']}>Добро пожаловать!</h1>

          <h2 className={styles['auth-subheader']}>
            Пожалуйста, авторизируйтесь
          </h2>

          <form className={styles['auth-form']}>
            <LoginInput />

            <PasswordInput />

            <div className={styles['auth-checkbox-wrapper']}>
              <Checkbox variant='default'>Запомнить данные</Checkbox>
            </div>

            <div className={styles['navigation']}>
              <Link to='/'>
                <Button className={styles['auth-button']}>Войти</Button>
              </Link>
            </div>

            <div className={styles['auth-or-wrapper']}>
              <Line />

              <span className={styles['auth-or']}>или</span>

              <Line />
            </div>
          </form>

          <div className={styles['auth-create-wrapper']}>
            <span className={styles['auth-create-text']}>Нет аккаунта?</span>
            &nbsp;
            <span className={styles['auth-create-link']}>Создать</span>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Auth;
