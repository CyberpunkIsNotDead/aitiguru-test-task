import { Button } from '@/shared/ui/Button';
import { Page } from '@/shared/ui/Page';
import { SearchInput } from '@/features/search/ui/SearchInput';
import styles from './Main.module.scss';
import PlusCircleIcon from '@/assets/icons/plusCircle.svg?react';
import RefreshIcon from '@/assets/icons/refresh.svg?react';
import { useNavigate } from 'react-router-dom';
import { ItemsHeader } from '@/widgets/ui/ItemsHeader';
import { useLogout } from '@/features/user/api/auth';

const Main = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation
      .mutateAsync()
      .then(() => {
        navigate('/auth');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <Page
      header={
        <ItemsHeader
          text='Товары'
          controls={
            <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
              Выйти
            </Button>
          }
        >
          <SearchInput placeholder='Найти' />
        </ItemsHeader>
      }
    >
      <div className={styles['main-content']}>
        <div className={styles['main-top']}>
          <h1 className={styles['main-top-text']}>Все позиции</h1>

          <div className={styles['main-top-buttons']}>
            <Button variant='white' isSquare>
              <RefreshIcon />
            </Button>

            <Button>
              <>
                <PlusCircleIcon />

                <span>Добавить</span>
              </>
            </Button>
          </div>
        </div>

        <div></div>

        <div></div>
      </div>
    </Page>
  );
};

export { Main };
