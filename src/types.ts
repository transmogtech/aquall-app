export type Product = {
  _id: number;
  imageUrl: string | null;
  name: string;
  categoryId: [];
  rating: number;
  price: number;
  description: string;
};

export type News = {
  id: number;
  image: string | null;
  name: string;
  date: string;
  time: string;
  description: string;
};

export type Job = {
  id: number;
  title: string | null;
  category: string;
  position: string;
  type: string;
  location: string;
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};

export type video = {
  id: string;
  title: string;
  url: string;
  date: string;
};

export type Company = {
  id: string;
  name: string;
  image: object;
};
