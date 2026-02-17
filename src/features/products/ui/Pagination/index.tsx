import CaretLeftIcon from '@/assets/icons/caretLeft.svg?react';
import CaretRightIcon from '@/assets/icons/caretRight.svg?react';
import styles from './Pagination.module.scss';
import { Button } from '@/shared/ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles['pagination']}>
      <Button
        variant='opaque'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles['pagination-caret']}
      >
        <CaretLeftIcon />
      </Button>

      <div className={styles['pagination-pages']}>
        {getVisiblePages().map((page) => (
          <Button
            key={page}
            variant='pagination'
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant='opaque'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles['pagination-caret']}
      >
        <CaretRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;
