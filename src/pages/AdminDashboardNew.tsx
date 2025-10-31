import { useState, useEffect } from 'react';
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Eye,
  Edit2,
  Trash2,
  Plus,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../lib/supabase';

interface AdminDashboardNewProps {
  admin: any;
  onLogout: () => void;
}

export function AdminDashboardNew({ admin, onLogout }: AdminDashboardNewProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    original_price: 0,
    discount: 0,
    image: '',
    rating: 0,
    sold: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('orders').select('*'),
      ]);

      const productsData = productsRes.data || [];
      const ordersData = ordersRes.data || [];

      setProducts(productsData);
      setOrders(ordersData);

      const totalRevenue = ordersData.reduce((sum: number, order: any) => sum + Number(order.total), 0);

      setStats({
        totalProducts: productsData.length,
        totalOrders: ordersData.length,
        totalRevenue,
        totalCustomers: new Set(ordersData.map((o: any) => o.user_id)).size,
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const productId = Math.max(...products.map(p => p.id), 0) + 1;
      const { error } = await supabase.from('products').insert([
        {
          id: productId,
          ...newProduct,
        },
      ]);

      if (error) throw error;
      await loadData();
      setNewProduct({
        title: '',
        price: 0,
        original_price: 0,
        discount: 0,
        image: '',
        rating: 0,
        sold: 0,
      });
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Add error:', error);
      toast.error('Failed to add product');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white
        transform transition-transform duration-300 md:transform-none z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-400 mt-1">{admin.name}</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${activeTab === item.id
                    ? 'bg-red-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <Button
            onClick={() => {
              localStorage.removeItem('adminUser');
              onLogout();
            }}
            variant="outline"
            className="w-full flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h2 className="text-xl font-bold text-gray-900 flex-1 md:flex-none">
            {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm text-gray-600">Welcome, {admin.name}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="p-4 md:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Products</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
                    </div>
                    <Package className="w-12 h-12 text-blue-500 opacity-20" />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
                    </div>
                    <ShoppingCart className="w-12 h-12 text-green-500 opacity-20" />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <DollarSign className="w-12 h-12 text-red-500 opacity-20" />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Customers</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCustomers}</p>
                    </div>
                    <Users className="w-12 h-12 text-purple-500 opacity-20" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Recent Orders
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Order ID</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Customer</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Total</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 font-mono text-xs">{order.id.slice(0, 8)}</td>
                          <td className="px-4 py-2">{order.shipping_name}</td>
                          <td className="px-4 py-2 font-semibold">${Number(order.total).toFixed(2)}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="p-4 md:p-6 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Product Title</Label>
                    <Input
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                      placeholder="Product name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Original Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newProduct.original_price}
                      onChange={(e) => setNewProduct({ ...newProduct, original_price: parseFloat(e.target.value) })}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Discount %</Label>
                    <Input
                      type="number"
                      value={newProduct.discount}
                      onChange={(e) => setNewProduct({ ...newProduct, discount: parseInt(e.target.value) })}
                      placeholder="0"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Image URL</Label>
                    <Input
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={newProduct.rating}
                      onChange={(e) => setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })}
                      placeholder="0.0"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Units Sold</Label>
                    <Input
                      type="number"
                      value={newProduct.sold}
                      onChange={(e) => setNewProduct({ ...newProduct, sold: parseInt(e.target.value) })}
                      placeholder="0"
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="md:col-span-2 bg-red-500 hover:bg-red-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">All Products ({products.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">ID</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Title</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Price</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Rating</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Sold</th>
                        <th className="px-4 py-2 text-center font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 font-mono text-xs">{product.id}</td>
                          <td className="px-4 py-2 max-w-xs truncate">{product.title}</td>
                          <td className="px-4 py-2 font-semibold">${Number(product.price).toFixed(2)}</td>
                          <td className="px-4 py-2">{Number(product.rating).toFixed(1)} ★</td>
                          <td className="px-4 py-2">{product.sold}</td>
                          <td className="px-4 py-2">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-4 md:p-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">All Orders ({orders.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Order ID</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Customer</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">City</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Total</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Status</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 font-mono text-xs">{order.id.slice(0, 8)}</td>
                          <td className="px-4 py-2">{order.shipping_name}</td>
                          <td className="px-4 py-2">{order.shipping_city}</td>
                          <td className="px-4 py-2 font-semibold">${Number(order.total).toFixed(2)}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="p-4 md:p-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">All Customers ({stats.totalCustomers})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Name</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">City</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Country</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Orders</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-900">Total Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.reduce((acc: any[], order: any) => {
                        const existing = acc.find(c => c.user_id === order.user_id);
                        if (existing) {
                          existing.orders += 1;
                          existing.totalSpent += Number(order.total);
                        } else {
                          acc.push({
                            user_id: order.user_id,
                            name: order.shipping_name,
                            city: order.shipping_city,
                            country: order.shipping_country,
                            orders: 1,
                            totalSpent: Number(order.total),
                          });
                        }
                        return acc;
                      }, []).map((customer: any) => (
                        <tr key={customer.user_id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{customer.name}</td>
                          <td className="px-4 py-2">{customer.city}</td>
                          <td className="px-4 py-2">{customer.country}</td>
                          <td className="px-4 py-2 font-semibold">{customer.orders}</td>
                          <td className="px-4 py-2 font-semibold">${customer.totalSpent.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
