import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: number;
  title: string;
  price: number;
  original_price?: number;
  discount?: number;
  image: string;
  rating: number;
  sold: number;
  category_id?: string;
  is_flash_deal: boolean;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  created_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  total: number;
  status: string;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_zip: string;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: number;
  quantity: number;
  price: number;
  variant?: string;
  created_at: string;
};

export type Review = {
  id: string;
  product_id: number;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  helpful_count: number;
  created_at: string;
};
