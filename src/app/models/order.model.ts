export interface Order {
    id: string;
    date: Date;
    products: string[];
    price: number;
    user: string;
    address: string;
    estado: string;
}
