import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/shared/api/apiFetch';

// Types
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductsQueryParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// API Functions
const getProducts = async ({
  limit = 30,
  skip = 0,
  sortBy = 'id',
  order = 'asc',
}: ProductsQueryParams = {}): Promise<ProductsResponse> => {
  const select = [
    'thumbnail',
    'title',
    'category',
    'brand',
    'sku',
    'rating',
    'price',
  ].join(',');

  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    select,
    sortBy,
    order,
  });

  const response = await apiFetch<ProductsResponse>(
    `/products?${params.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};

// Hooks
const useProducts = (
  page = 1,
  limit = 30,
  sortBy = 'id',
  order: 'asc' | 'desc' = 'asc'
) => {
  const skip = (page - 1) * limit;

  return useQuery({
    queryKey: ['products', { skip, limit, sortBy, order }],
    queryFn: () => getProducts({ skip, limit, sortBy, order }),
  });
};

// Exports
export type { Product, ProductsResponse, ProductsQueryParams };
export { useProducts };
