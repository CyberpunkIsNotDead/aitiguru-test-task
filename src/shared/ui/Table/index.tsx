import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type RowData,
  type Row,
} from '@tanstack/react-table';

import styles from './Table.module.scss';

interface TableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  isLoading?: boolean;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  getRowClassName?: (row: Row<TData>) => string | undefined;
}

function Table<TData extends RowData>({
  data,
  columns,
  className = '',
  isLoading = false,
  error,
  getRowClassName,
}: TableProps<TData>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className={styles['loading']}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles['error']}>{error}</div>;
  }

  return (
    <div className={`${styles['table-container']} ${className}`}>
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
            <tr
              key={row.id}
              className={getRowClassName ? getRowClassName(row) : ''}
            >
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
}

export default Table;
