import { Client } from "./client";
import { Product } from "./product";

export interface Sale {
    id: number;
    productId: number;
    clientId: number;
    price: string;
    isPay: number;
    volumen: number;
    other_1: string;
    other_2: string;
    createdAt: string;
    product: Product;
    client: Client;
}
