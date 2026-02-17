import { type ColumnDef, type Row } from '@tanstack/react-table';
import { type Product } from '@/features/products/api/products';
import styles from './ProductsTable.module.scss';
import { Checkbox } from '@/shared/ui/Checkbox';
import Table from '@/shared/ui/Table';
import classNames from 'classnames';
import { Button } from '@/shared/ui/Button';
import PlusIcon from '@/assets/icons/plus.svg?react';
import DotsThreeCircleIcon from '@/assets/icons/dotsThreeCircle.svg?react';
import { useState } from 'react';

interface ProductsTableProps {
  data?: Product[];
  isLoading?: boolean;
  error?: string;
}

const ProductsTable = ({
  data,
  isLoading = false,
  error,
}: ProductsTableProps) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'checkbox',
      header: () => {
        const allProducts = data ?? [];
        const allSelected =
          allProducts.length > 0 &&
          allProducts.every((product) => selectedRows.has(product.id));

        const handleSelectAll = (checked: boolean) => {
          if (checked) {
            setSelectedRows(new Set(allProducts.map((product) => product.id)));
          } else {
            setSelectedRows(new Set());
          }
        };

        return (
          <Checkbox
            variant='darker'
            checked={allSelected}
            onCheckedChange={handleSelectAll}
          />
        );
      },
      cell: ({ row }) => {
        const product = row.original;
        const isSelected = selectedRows.has(product.id);

        const handleRowSelect = (checked: boolean) => {
          setSelectedRows((prev) => {
            const newSet = new Set(prev);
            if (checked) {
              newSet.add(product.id);
            } else {
              newSet.delete(product.id);
            }
            return newSet;
          });
        };

        return (
          <Checkbox
            variant='darker'
            checked={isSelected}
            onCheckedChange={handleRowSelect}
          />
        );
      },
    },
    {
      accessorKey: 'title',
      header: () => (
        <div className={styles['product-title-header']}>
          <span>Наименование</span>
        </div>
      ),
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className={styles['product-title-cell']}>
            <div className={styles['product-thumbnail']}>
              <img src={product.thumbnail} />
            </div>

            <div className={styles['product-info']}>
              <span className={styles['product-title']}>{product.title}</span>

              <span className={styles['product-category']}>
                {product.category}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'brand',
      header: 'Вендор',
      cell: ({ row }) => {
        const product = row.original;

        return (
          <span className={styles['product-brand-cell']}>{product.brand}</span>
        );
      },
    },
    {
      accessorKey: 'sku',
      header: 'Артикул',
    },
    {
      accessorKey: 'rating',
      header: 'Оценка',
      cell: ({ row: { original: product } }) => {
        const formattedRating = Number(product.rating).toFixed(1);

        const ratingClassName = classNames(
          styles['product-rating'],
          Number(formattedRating) < 3 && styles['product-rating-low']
        );

        return (
          <span className={styles['product-rating-cell']}>
            <span className={ratingClassName}>{formattedRating}</span>/5
          </span>
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Цена, ₽',
      cell: ({ row: { original: product } }) => {
        const [integer, decimals] = product.price.toString().split('.');

        const formattedInteger =
          integer
            ?.match(/.{1,3}/g)
            ?.reverse()
            .join(' ') ?? 0;

        return (
          <span className={styles['product-price-cell']}>
            {formattedInteger}

            <span className={styles['product-price-decimals']}>
              {
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                `,${decimals || '00'}`
              }
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: 'controls',
      header: '',
      cell: () => (
        <div className={styles['product-controls-cell']}>
          <div className={styles['product-controls-wrapper']}>
            <Button className={styles['product-plus-button']}>
              <PlusIcon />
            </Button>

            <Button variant='opaque' className={styles['product-dots-button']}>
              <DotsThreeCircleIcon />
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const getRowClassName = (row: Row<Product>) => {
    const product = row.original;
    return selectedRows.has(product.id) ? styles['selected'] : '';
  };

  return (
    <Table
      data={data ?? []}
      columns={columns}
      className={styles['product-table']}
      isLoading={isLoading}
      error={error ? 'Ошибка загрузки данных' : undefined}
      getRowClassName={getRowClassName}
    />
  );
};

export default ProductsTable;
