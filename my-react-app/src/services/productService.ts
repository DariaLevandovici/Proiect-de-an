import { API_ENDPOINTS } from '../config/api';
import type { Product, CreateProductDto } from '../types/product';

/**
 * Fetch all products from the backend.
 * GET http://localhost:5224/api/Products
 */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_ENDPOINTS.products);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<Product[]>;
}

/**
 * Create a new product in the backend.
 * POST http://localhost:5224/api/Products
 */
export async function createProduct(dto: CreateProductDto): Promise<Product> {
  const response = await fetch(API_ENDPOINTS.products, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<Product>;
}

/**
 * Delete a product by id.
 * DELETE http://localhost:5224/api/Products/{id}
 */
export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.status} ${response.statusText}`);
  }
}
