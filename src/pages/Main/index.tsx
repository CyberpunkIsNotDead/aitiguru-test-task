import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/common/components/Button';
import Page from '@/common/components/Page';
import PasswordInput from '@/features/user/ui/PasswordInput';
import Header from '@/common/components/Header';
import SearchInput from '@/features/search/ui/SearchInput';
import styles from './Main.module.scss';

const Main = () => {
  const [count, setCount] = useState(0);

  return (
    <Page
      header={
        <Header text='Товары'>
          <SearchInput placeholder='Найти' />
        </Header>
      }
    >
      <div className={styles.main}>
        <div className={styles['search-container']}>
          <SearchInput placeholder='Найти' />
        </div>

        <h1>Welcome to React App</h1>
        <p>
          This is the main page built with React, TypeScript, and SCSS modules.
          The page uses vertical centered flexbox layout and includes a custom
          Button component.
        </p>

        <div className={styles['button-container']}>
          <Button onClick={() => setCount((count) => count + 1)}>
            Count: {count}
          </Button>
          <Button onClick={() => setCount(0)}>Reset</Button>
        </div>

        <p>
          Current count: <strong>{count}</strong>
        </p>

        <div className={styles['mono-example']}>
          <h2>Roboto Mono Font Example</h2>
          <p className={styles['mono-text']}>
            This text uses Roboto Mono font family.
          </p>
          <code className={styles['code-block']}>
            {`function example() {
  const message = "Hello, Roboto Mono!";
  console.log(message);
  return message;
}`}
          </code>
        </div>

        <div className={styles['password-section']}>
          <h2>Password Input Example</h2>
          <PasswordInput placeholder='Пароль' />
        </div>

        <div className={styles.navigation}>
          <Link to='/auth'>
            <Button>Go to Auth Page</Button>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default Main;
