import { Button } from '@/shared/ui/Button';
import { Page } from '@/shared/ui/Page';
import { SearchInput } from '@/features/search/ui/SearchInput';
import styles from './Main.module.scss';
import PlusCircleIcon from '@/assets/icons/plusCircle.svg?react';
import RefreshIcon from '@/assets/icons/refresh.svg?react';
import { Link } from 'react-router-dom';
import { ItemsHeader } from '@/widgets/ui/ItemsHeader';

const Main = () => {
  return (
    <Page
      header={
        <ItemsHeader
          text='Товары'
          controls={
            <Link to='/auth'>
              <Button>Выйти</Button>
            </Link>
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
