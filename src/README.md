# AliExpress Mobile App Clone

A fully functional mobile e-commerce application inspired by AliExpress, built with React and Tailwind CSS. Includes a complete admin panel for managing products, orders, and users.

## Features

### 🏠 Home Page
- Search functionality
- Category navigation with pills
- Flash deals section
- Product grid with "Just For You" recommendations
- Bottom navigation bar
- Dynamic cart counter

### 📂 Categories Page
- All categories with item counts
- Popular categories grid
- Category images and icons
- Search categories
- Trending searches
- Navigate to specific category pages

### 📱 Product Detail Page
- Full product images
- Price and discount information
- Customer ratings and reviews
- Product specifications
- Color and size selection
- Quantity selector
- Add to Cart and Buy Now options
- Favorite/wishlist button
- Shipping and buyer protection information

### 🛒 Shopping Cart
- View all cart items
- Select/deselect items for checkout
- Adjust quantities
- Remove items
- Real-time price calculation
- Empty cart state

### 💳 Checkout Flow
- Three-step checkout process:
  1. Shipping address form
  2. Payment method selection (Card, PayPal, COD)
  3. Order review
- Progress indicator
- Order summary with shipping costs

### 📦 Orders Page
- Order history with status tracking
- Tabs for filtering (All, Processing, Shipped, Delivered, Cancelled)
- Order details with items and tracking numbers
- Quick actions (Buy Again, Review, Track, Cancel)
- Order statistics dashboard

### 👤 Account Page
- **Login System:**
  - Beautiful login form with email and password fields
  - Admin login detection (redirects to admin panel)
  - Demo credentials displayed for easy testing
  - Forgot password option
  - Sign up option
- **User Profile (After Login):**
  - User profile with avatar
  - Account statistics (Orders, Wishlist, Coupons)
  - Membership level with progress bar
  - Organized settings menu:
    - Orders & Shopping section
    - Account Settings section
    - Support & Info section
  - Badge notifications
  - Logout functionality

### 🏷️ Category Pages (Electronics, Fashion, Beauty, Sports, Toys)
- Category-specific banners
- Subcategory navigation grid
- Featured deals section
- Product listings with filter and sort
- Dedicated page for each category

### 🔍 Filter & Sort
- Filter by:
  - Price range
  - Categories
  - Minimum rating
  - Free shipping
- Sort by:
  - Recommended
  - Price (Low to High / High to Low)
  - Highest Rating
  - Most Popular
  - Newest Arrivals

### 🔧 Admin Panel (Advanced)
**Dashboard**
- Revenue, Orders, Products, Users statistics with growth indicators
- Interactive charts (Revenue Overview, Orders Overview)
- Recent orders list with status
- Top products with sales and revenue data

**Products Management**
- Products table with images, pricing, stock, and ratings
- Search and filter functionality
- Add new product with dialog form
- Edit and delete products
- Pagination
- Export capability

**Orders Management**
- Comprehensive order tracking
- Status-based tabs (All, Processing, Shipped, Delivered, Cancelled)
- Order details with customer info
- Quick view and export options
- Order statistics cards

**Users Management**
- User table with profiles, roles, and activity
- User statistics (Total, Active, New, Premium)
- Role-based badges (Admin, Customer)
- Email and edit actions
- User status indicators

**Additional Admin Features**
- Collapsible sidebar navigation
- Analytics page (placeholder)
- Settings page (placeholder)
- Notifications bell
- Admin profile display
- Responsive layout for desktop

### 📦 Additional Features
- **Footer Section:**
  - Feature highlights (Great value, Worldwide shipping, Safe payment, etc.)
  - Social media links (Stay connected section)
  - Navigation links organized by category:
    - Shopping with us
    - Customer service
    - Collaborate with us
  - Help and support links
  - Browse by category section
  - App store download buttons (Google Play & App Store)
  - Multi-language sites information
  - Alibaba Group links
  - Legal and privacy information
  - Copyright notice
- Toast notifications for user actions
- Responsive design optimized for mobile
- Smooth transitions and hover effects
- Mock data for realistic product display
- Context-based state management for cart
- Multiple admin access methods (login or secret click)

## Technology Stack

- React with TypeScript
- Tailwind CSS for styling
- Shadcn/ui component library
- Lucide React for icons
- Recharts for analytics charts
- Sonner for toast notifications
- Context API for state management

## Navigation Guide

**Customer App:**
- Use the bottom navigation bar to switch between Home, Categories, Orders, and Account
- Click on any product card to view details
- Click the cart icon in the header to view your cart
- Click category pills to filter products
- Click "View All" or category cards to visit category-specific pages

**Admin Panel Access (Two Methods):**
1. **Login Method (Recommended):**
   - Navigate to the Account page using the bottom navigation
   - Enter the admin credentials:
     - Email: `admin@gmail.com`
     - Password: `admin123@`
   - Click "Sign In" to access the admin panel
   
2. **Quick Access:**
   - Click the "AliExpress" logo 5 times rapidly on the home page

**Admin Panel Navigation:**
- Use the sidebar to navigate between Dashboard, Products, Orders, Users, Analytics, and Settings
- Click the collapse button to minimize the sidebar
- Click Logout to return to the customer app

## Getting Started

The application is fully functional and ready to use. All data is mocked for demonstration purposes. The app includes:
- 8 product items in the main catalog
- 4 flash deal items
- 4 sample orders with different statuses
- 5 customer reviews per product
- Complete product specifications
- 8 major categories with subcategories
- Admin dashboard with charts and statistics
