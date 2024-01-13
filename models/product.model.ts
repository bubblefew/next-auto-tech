export type ProductData = {
    id?: number;
    name: string;
    image?: string;
    qty?: number;
    price: number;
    stock: number;
    file?: any;
    file_obj?: URL | string;
    createdAt?: Date;
    updatedAt?: Date;
}
