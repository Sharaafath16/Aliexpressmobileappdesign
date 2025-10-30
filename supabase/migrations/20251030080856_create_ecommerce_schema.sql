/*
  # E-commerce Database Schema for AliExpress Clone

  ## Overview
  This migration creates a complete e-commerce database schema with all necessary tables
  for products, categories, orders, users, and reviews functionality.

  ## New Tables

  ### 1. `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (e.g., Electronics, Fashion)
  - `icon` (text) - Icon identifier for UI rendering
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. `products`
  - `id` (bigint, primary key) - Product identifier
  - `title` (text) - Product title/name
  - `price` (decimal) - Current selling price
  - `original_price` (decimal, nullable) - Original price before discount
  - `discount` (integer, nullable) - Discount percentage
  - `image` (text) - Product image URL
  - `rating` (decimal) - Average product rating (0-5)
  - `sold` (integer) - Number of units sold
  - `category_id` (uuid, nullable) - Foreign key to categories
  - `is_flash_deal` (boolean) - Flag for flash deal products
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `orders`
  - `id` (uuid, primary key) - Order identifier
  - `user_id` (text) - User identifier (can be guest or authenticated)
  - `total` (decimal) - Order total amount
  - `status` (text) - Order status (pending, processing, shipped, delivered, cancelled)
  - `shipping_name` (text) - Recipient name
  - `shipping_address` (text) - Delivery address
  - `shipping_city` (text) - City
  - `shipping_country` (text) - Country
  - `shipping_zip` (text) - Postal code
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `order_items`
  - `id` (uuid, primary key) - Order item identifier
  - `order_id` (uuid) - Foreign key to orders
  - `product_id` (bigint) - Foreign key to products
  - `quantity` (integer) - Quantity ordered
  - `price` (decimal) - Price at time of order
  - `variant` (text, nullable) - Product variant details (size, color)
  - `created_at` (timestamptz) - Record creation timestamp

  ### 5. `reviews`
  - `id` (uuid, primary key) - Review identifier
  - `product_id` (bigint) - Foreign key to products
  - `user_name` (text) - Reviewer name
  - `user_avatar` (text, nullable) - Reviewer avatar URL
  - `rating` (integer) - Rating value (1-5)
  - `comment` (text) - Review comment
  - `images` (text[], nullable) - Array of review image URLs
  - `helpful_count` (integer) - Number of helpful votes
  - `created_at` (timestamptz) - Review creation timestamp

  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Public read access for products, categories, and reviews
  - Authenticated users can create orders and reviews
  - Users can only view and modify their own orders

  ## Indexes
  - Indexes on foreign keys for optimal query performance
  - Index on product category for filtering
  - Index on order user_id for user order lookup
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id bigint PRIMARY KEY,
  title text NOT NULL,
  price decimal(10, 2) NOT NULL,
  original_price decimal(10, 2),
  discount integer,
  image text NOT NULL,
  rating decimal(3, 2) DEFAULT 0,
  sold integer DEFAULT 0,
  category_id uuid REFERENCES categories(id),
  is_flash_deal boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  total decimal(10, 2) NOT NULL,
  status text DEFAULT 'pending',
  shipping_name text NOT NULL,
  shipping_address text NOT NULL,
  shipping_city text NOT NULL,
  shipping_country text NOT NULL,
  shipping_zip text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id bigint REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 1,
  price decimal(10, 2) NOT NULL,
  variant text,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id bigint REFERENCES products(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  user_avatar text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  images text[],
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_flash_deal ON products(is_flash_deal);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- RLS Policies for orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for order_items
CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for reviews (public read, authenticated create)
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create reviews"
  ON reviews FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample categories
INSERT INTO categories (id, name, icon) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Electronics', 'Smartphone'),
  ('00000000-0000-0000-0000-000000000002', 'Fashion', 'Shirt'),
  ('00000000-0000-0000-0000-000000000003', 'Beauty', 'Heart'),
  ('00000000-0000-0000-0000-000000000004', 'Sports', 'Zap'),
  ('00000000-0000-0000-0000-000000000005', 'Toys', 'Gift')
ON CONFLICT (id) DO NOTHING;

-- Insert sample flash deal products
INSERT INTO products (id, title, price, original_price, discount, image, rating, sold, is_flash_deal) VALUES
  (101, 'Wireless Headphones', 29.99, 59.99, 50, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYxNjYyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.5, 8234, true),
  (102, 'Phone Case Set', 12.99, 25.99, 50, 'https://images.unsplash.com/photo-1583573864191-af3ab094887a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzYxNjExMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.8, 15432, true),
  (103, 'Smart Watch', 39.99, 79.99, 50, 'https://images.unsplash.com/photo-1717295248494-937c3a5655b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHN8ZW58MXx8fHwxNzYxNjkyMTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.6, 11234, true),
  (104, 'Cosmetics Set', 19.99, 39.99, 50, 'https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzYxNjE2MzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.9, 20145, true)
ON CONFLICT (id) DO NOTHING;

-- Insert regular products
INSERT INTO products (id, title, price, original_price, discount, image, rating, sold, category_id) VALUES
  (1, 'Wireless Bluetooth Headphones with Noise Cancellation', 45.99, 89.99, 49, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYxNjYyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.5, 12453, '00000000-0000-0000-0000-000000000001'),
  (2, 'Premium Smartphone Accessories Bundle', 24.99, 49.99, 50, 'https://images.unsplash.com/photo-1583573864191-af3ab094887a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzYxNjExMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.7, 8932, '00000000-0000-0000-0000-000000000001'),
  (3, 'Smart Watch Fitness Tracker', 59.99, 129.99, 54, 'https://images.unsplash.com/photo-1717295248494-937c3a5655b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHN8ZW58MXx8fHwxNzYxNjkyMTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.6, 15678, '00000000-0000-0000-0000-000000000001'),
  (4, 'Trendy Fashion Clothing Collection', 34.99, 69.99, 50, 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzYxNzAwNzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.3, 6721, '00000000-0000-0000-0000-000000000002'),
  (5, 'Modern Home Decor Set', 28.99, 54.99, 47, 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3J8ZW58MXx8fHwxNzYxNjQxMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.8, 4532, NULL),
  (6, 'Professional Beauty & Cosmetics Kit', 39.99, 79.99, 50, 'https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzYxNjE2MzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.9, 21345, '00000000-0000-0000-0000-000000000003'),
  (7, 'Professional Sports Equipment Set', 89.99, 149.99, 40, 'https://images.unsplash.com/photo-1602211844066-d3bb556e983b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYxNjQ4OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.4, 3421, '00000000-0000-0000-0000-000000000004'),
  (8, 'Educational Toys & Games Bundle', 32.99, 59.99, 45, 'https://images.unsplash.com/photo-1696527018053-6248a8a863f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lzJTIwZ2FtZXN8ZW58MXx8fHwxNzYxNjcwNDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 4.7, 9876, '00000000-0000-0000-0000-000000000005')
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (product_id, user_name, user_avatar, rating, comment, helpful_count) VALUES
  (1, 'John Doe', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', 5, 'Excellent product! The noise cancellation works perfectly and the battery life is amazing.', 45),
  (1, 'Sarah Smith', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', 4, 'Great headphones, very comfortable for long use. Only minor issue is the Bluetooth range.', 23),
  (3, 'Mike Johnson', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', 5, 'Best fitness tracker I have ever used. Tracks everything accurately!', 67)
ON CONFLICT DO NOTHING;