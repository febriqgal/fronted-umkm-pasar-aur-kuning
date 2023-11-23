export interface Order {
  id: string;
  cart_id: string;
  user_id: string;
  product_id: string;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
  payment: string;
  product: Product;
  cart: Cart;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  user_id: string;
  title: string;
  desc: string;
  price: string;
  image: string;
  stock: string;
  discount: string;
  category: string;
  total: string;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: string;
  note: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total: number;
  created_at: string;
  updated_at: string;
}
