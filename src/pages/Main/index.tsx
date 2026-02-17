import { Button } from '@/shared/ui/Button';
import { Page } from '@/shared/ui/Page';
import { SearchInput } from '@/features/search/ui/SearchInput';
import styles from './Main.module.scss';
import PlusCircleIcon from '@/assets/icons/plusCircle.svg?react';
import RefreshIcon from '@/assets/icons/refresh.svg?react';
import { useNavigate } from 'react-router-dom';
import { ItemsHeader } from '@/widgets/ui/ItemsHeader';
import { useLogout } from '@/features/user/api/auth';
import { useState } from 'react';
import ProductsTable from '@/features/products/ui/ProductsTable';
import Pagination from '@/features/products/ui/Pagination';
import { useProducts } from '@/features/products/api/products';

const Main = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const sortBy = 'id';
  const order: 'asc' | 'desc' = 'asc';

  const limit = 20;

  // Get products data to access total items count
  const { data: productsData, isFetching } = useProducts(
    currentPage,
    limit,
    sortBy,
    order,
    searchQuery
  );

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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const skip = Number(productsData?.skip);
  const total = Number(productsData?.total);
  const last = skip + limit;
  const calculatedLast = total < last ? total : last;

  return (
    <Page
      isLoading={isFetching}
      header={
        <ItemsHeader
          text='Товары'
          controls={
            <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
              Выйти
            </Button>
          }
        >
          <SearchInput
            placeholder='Найти'
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
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

        <div className={styles['main-table']}>
          <ProductsTable
            data={productsData?.products}
            isLoading={isFetching}
            error={productsData ? undefined : 'Ошибка загрузки данных'}
          />
        </div>

        <div className={styles['main-bottom']}>
          <span className={styles['main-page-counter']}>
            Показано{' '}
            <span className={styles.count}>
              {skip + 1}-{calculatedLast}
            </span>{' '}
            из <span className={styles.count}>{total}</span>
          </span>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / limit)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </Page>
  );
};

export { Main };
