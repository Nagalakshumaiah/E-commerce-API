
export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export interface User {
  id: number;
  username: string;
  role: Role;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
