import axios from 'axios';
import type { Product } from '../types/product';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const productAPI = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  getLimitedProducts: async (limit: number): Promise<Product[]> => {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  },
};