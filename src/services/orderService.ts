import { supabase, Order, OrderItem } from '../lib/supabase';

export async function createOrder(orderData: {
  user_id: string;
  total: number;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_zip: string;
}): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating order:', error);
    return null;
  }

  return data;
}

export async function createOrderItems(items: Array<{
  order_id: string;
  product_id: number;
  quantity: number;
  price: number;
  variant?: string;
}>): Promise<boolean> {
  const { error } = await supabase
    .from('order_items')
    .insert(items);

  if (error) {
    console.error('Error creating order items:', error);
    return false;
  }

  return true;
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data || [];
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  if (error) {
    console.error('Error fetching order items:', error);
    return [];
  }

  return data || [];
}
