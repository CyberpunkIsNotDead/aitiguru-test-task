import { useState } from 'react';
import Button from '@/common/components/Button';
import styles from './Main.module.scss';

const Main = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.main}>
      <h1>Welcome to React App</h1>
      <p>
        This is the main page built with React, TypeScript, and SCSS modules.
        The page uses vertical centered flexbox layout and includes the custom
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
    </div>
  );
};

export default Main;
