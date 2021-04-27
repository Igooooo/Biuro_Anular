export interface User {
    id: number;
    name: string;
    surname: string;
    pesel: string;
    city: string;
    street: string;
    phone: string;
    email: string;
    createdAt?: string;
    password?: string;
    type: string;
    token?: string
}

