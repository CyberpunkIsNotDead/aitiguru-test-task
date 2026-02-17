import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { useProducts, type Product } from '@/features/products/api/products';
import styles from './ProductsTable.module.scss';

interface ProductsTableProps {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

const ProductsTable = ({
  page = 1,
  limit = 30,
  sortBy = 'id',
  order = 'asc',
}: ProductsTableProps) => {
  const { data, isLoading, error } = useProducts(page, limit, sortBy, order);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'title',
      header: 'Название',
    },
    {
      accessorKey: 'brand',
      header: 'Бренд',
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'rating',
      header: 'Рейтинг',
    },
    {
      accessorKey: 'price',
      header: 'Цена',
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.products ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className={styles['loading']}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles['error']}>Ошибка загрузки данных</div>;
  }

  return (
    <div className={styles['table-container']}>
      <table className={styles['table']}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
