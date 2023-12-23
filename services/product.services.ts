import { ProductData } from '@/models/product.model';
import httpClient from '@/utils/httpClient';


export const doGetStockById = async (id: string) => {
    const response = await httpClient.get(`/stock/product/${id}`);
    return response.data;
};


export const getProducts = async (): Promise<ProductData[]> => {
    return (await httpClient.get(`/stock/product`)).data;
};


export const addProduct = async (data: FormData): Promise<void> => {
    await httpClient.post(`/stock/product`, data);
};


export const editProduct = async (data: FormData): Promise<void> => {
    await httpClient.put(`/stock/product`, data);
};

export const deleteProduct = async (id?: string): Promise<void> => {
    await httpClient.delete(`/stock/product/${id}`);
};

