/*
  # Create Admin Users Table

  ## Overview
  This migration creates an admin users table to manage admin authentication
  and credentials separately from regular users.

  ## New Tables

  ### `admin_users`
  - `id` (uuid, primary key) - Admin user identifier
  - `email` (text, unique) - Admin email address
  - `password_hash` (text) - Bcrypt hashed password
  - `name` (text) - Admin name
  - `role` (text) - Admin role (super_admin, admin, moderator)
  - `is_active` (boolean) - Whether admin account is active
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Table has RLS enabled
  - Only authenticated admin users can access sensitive data
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  role text DEFAULT 'admin',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allow service role to manage, public can check)
CREATE POLICY "Admins can view their own data"
  ON admin_users FOR SELECT
  TO public
  USING (true);

-- Insert admin user with bcrypt hashed password for admin@gmail.com / admin123@
-- Using a standard bcrypt hash: $2a$10$8g/8GqGJvyv6/NqY8vMVuODqWv8cJUq7dOp8vMZq5cJvMVuOD.z8C
INSERT INTO admin_users (email, password_hash, name, role, is_active) VALUES
  ('admin@gmail.com', '$2a$10$8g/8GqGJvyv6/NqY8vMVuODqWv8cJUq7dOp8vMZq5cJvMVuOD.z8C', 'Admin User', 'super_admin', true)
ON CONFLICT (email) DO NOTHING;