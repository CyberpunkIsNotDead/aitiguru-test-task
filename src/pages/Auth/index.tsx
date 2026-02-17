import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginInput } from '@/features/user/ui/LoginInput';
import { PasswordInput } from '@/features/user/ui/PasswordInput';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Page } from '@/shared/ui/Page';
import styles from './Auth.module.scss';
import { Line } from '@/shared/ui/Line';
import { useLoginForm } from '@/features/user/model/useLoginForm';
import { useLogin } from '@/features/user/api/auth';
import type React from 'react';

const Auth = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [rememberMe, setRememberMe] = useState(false);

  const loginForm = useLoginForm({
    onSubmit: async (values) => {
      try {
        await loginMutation.mutateAsync({ ...values, persist: rememberMe });
        // Handle successful login (e.g., redirect)
        console.log('Login successful');
        navigate('/');
      } catch (error) {
        // Handle login error
        console.error('Login failed:', error);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginForm.handleSubmit();
  };

  return (
    <Page>
      <div className={styles['auth-content-wrapper']}>
        <div className={styles['auth-content']}>
          <div className={styles['auth-logo-wrapper']}>
            <img src='/icons/logo.svg' />
          </div>

          <h1 className={styles['auth-header']}>Добро пожаловать!</h1>

          <h2 className={styles['auth-subheader']}>
            Пожалуйста, авторизуйтесь
          </h2>

          <form className={styles['auth-form']} onSubmit={handleSubmit}>
            <loginForm.Field name='username'>
              {(field) => (
                <LoginInput
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  disabled={loginMutation.isPending}
                />
              )}
            </loginForm.Field>

            <loginForm.Field name='password'>
              {(field) => (
                <PasswordInput
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  disabled={loginMutation.isPending}
                />
              )}
            </loginForm.Field>

            <div className={styles['auth-checkbox-wrapper']}>
              <Checkbox
                variant='default'
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              >
                Запомнить данные
              </Checkbox>
            </div>

            <div className={styles['navigation']}>
              <Button
                className={styles['auth-button']}
                type='submit'
                disabled={loginMutation.isPending}
              >
                Войти
              </Button>
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

export { Auth };
