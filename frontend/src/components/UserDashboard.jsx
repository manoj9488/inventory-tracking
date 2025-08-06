import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/stocks');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const filteredProducts = products.filter(product =>
    product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                <span className="text-white font-bold text-xl">📦</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-lg hover:from-fuchsia-600 hover:to-pink-600 transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg animate-fade-in-right"
            >
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div className="animate-slide-right">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
              <p className="text-gray-600">Here's your current product inventory</p>
            </div>
            <div className="hidden md:block animate-slide-left">
              <div className="flex items-center space-x-6 text-center">
                <div className="bg-blue-50 rounded-lg p-4 transform hover:scale-110 hover:shadow-lg transition-all duration-300 animate-bounce-slow">
                  <div className="text-2xl font-bold text-blue-600 animate-count-up">{products.length}</div>
                  <div className="text-sm text-gray-600">Total Products</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 transform hover:scale-110 hover:shadow-lg transition-all duration-300 animate-bounce-slow" style={{animationDelay: '0.2s'}}>
                  <div className="text-2xl font-bold text-green-600 animate-count-up">
                    {products.reduce((sum, product) => sum + product.quantity, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Stock</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-900 animate-fade-in">Product Inventory</h3>
            <div className="relative animate-fade-in-right">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transform focus:scale-105 transition-all duration-300"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 animate-pulse">🔍</span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-fade-in-up">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="ml-3 text-gray-600 font-medium animate-pulse">Loading products...</span>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="text-6xl mb-4 animate-bounce">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No products available in inventory'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 animate-slide-down">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gradient-to-r hover:from-blue-25 hover:to-indigo-25 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md animate-fade-in-row"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3 transform hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg">
                            <span className="text-white font-bold">
                              {product.itemName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">{product.itemName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transform hover:scale-110 transition-all duration-300 ${
                          product.quantity > 50 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : product.quantity > 10
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200 animate-pulse'
                        }`}>
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate hover:text-blue-600 transition-colors duration-200" title={product.description}>
                          {product.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transform hover:scale-110 transition-all duration-300 ${
                          product.quantity > 50 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : product.quantity > 10
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200 animate-pulse'
                        }`}>
                          {product.quantity > 50 ? '✅ In Stock' : product.quantity > 10 ? '⚠️ Low Stock' : '❌ Critical'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Cards for Mobile */}
        <div className="md:hidden mt-8 grid grid-cols-2 gap-4 animate-slide-up">
          <div className="bg-white rounded-lg shadow p-4 text-center border border-gray-200 transform hover:scale-105 hover:shadow-lg transition-all duration-300 animate-bounce-slow">
            <div className="text-2xl font-bold text-blue-600 animate-count-up">{products.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center border border-gray-200 transform hover:scale-105 hover:shadow-lg transition-all duration-300 animate-bounce-slow" style={{animationDelay: '0.2s'}}>
            <div className="text-2xl font-bold text-green-600 animate-count-up">
              {products.reduce((sum, product) => sum + product.quantity, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Stock</div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-row {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes count-up {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
        
        .animate-fade-in-row {
          animation: fade-in-row 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-right {
          animation: slide-right 0.8s ease-out;
        }
        
        .animate-slide-left {
          animation: slide-left 0.8s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        .animate-count-up {
          animation: count-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
