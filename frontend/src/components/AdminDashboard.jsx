import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    itemName: "",
    quantity: "",
    description: "",
  });

  const handleLogout = () => {
    window.location.href = "/";
  };

  const navigateToUserDashboard = () => {
    window.location.href = "/dashboard";
  };

  const navigateTouserinfo = () => {
    window.location.href = "/userinfo";
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/stocks");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`http://localhost:5000/api/admin/stock/${id}`, {
          method: "DELETE",
        });
        getProduct();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct({
      ...product,
      originalId: product._id,
    });
  };

  const handleUpdateProduct = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/admin/stock/${editingProduct.originalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemName: editingProduct.itemName,
            quantity: editingProduct.quantity,
            description: editingProduct.description,
          }),
        }
      );
      setEditingProduct(null);
      getProduct();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const createProduct = async () => {
    if (
      !newProduct.itemName ||
      !newProduct.quantity ||
      !newProduct.description
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await fetch("http://localhost:5000/api/admin/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      setNewProduct({ itemName: "", quantity: "", description: "" });
      setShowAddForm(false);
      getProduct();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
     
      <header className="bg-white shadow-sm border-b border-slate-200 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-3 animate-fade-in-right">
              <button
                onClick={navigateToUserDashboard}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-200"
              >
                Users Dashboard
              </button>
              <button
                onClick={navigateTouserinfo}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-200"
              >
                Users Info
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 animate-fade-in-up hover:shadow-lg hover:scale-105 transition-all duration-300" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg transform hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-semibold text-gray-900 animate-count-up">
                  {products.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 animate-fade-in-up hover:shadow-lg hover:scale-105 transition-all duration-300" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg transform hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Stock</p>
                <p className="text-2xl font-semibold text-gray-900 animate-count-up">
                  {products.reduce(
                    (sum, product) => sum + parseInt(product.quantity || 0),
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 animate-fade-in-up hover:shadow-lg hover:scale-105 transition-all duration-300" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg transform hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-6 h-6 text-yellow-600 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.768 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Low Stock Items
                </p>
                <p className="text-2xl font-semibold text-gray-900 animate-count-up">
                  {
                    products.filter(
                      (product) => parseInt(product.quantity || 0) < 10
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 animate-slide-up">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 animate-fade-in">
                Product Inventory
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium text-sm shadow-sm animate-fade-in-right"
              >
                + Add Product
              </button>
            </div>
          </div>

          
          {showAddForm && (
            <div className="px-6 py-4 bg-gray-50 border-b border-slate-200 animate-slide-down">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.itemName}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, itemName: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:scale-105 transition-all duration-200 animate-fade-in"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:scale-105 transition-all duration-200 animate-fade-in"
                  style={{animationDelay: '0.1s'}}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:scale-105 transition-all duration-200 animate-fade-in"
                  style={{animationDelay: '0.2s'}}
                />
                <div className="flex space-x-2 animate-fade-in" style={{animationDelay: '0.3s'}}>
                  <button
                    onClick={createProduct}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm font-medium"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:scale-105 transition-all duration-200 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="relative flex justify-center items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                </div>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <p className="ml-3 text-gray-500 font-medium animate-pulse">Loading products...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center text-gray-500 animate-fade-in">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No products
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding a new product.
                </p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50 animate-slide-down">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, index) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] animate-fade-in-row"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      {editingProduct &&
                      editingProduct.originalId === product._id ? (
                        <>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editingProduct.itemName}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  itemName: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:scale-105 transition-all duration-200"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={editingProduct.quantity}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  quantity: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:scale-105 transition-all duration-200"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editingProduct.description}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  description: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:scale-105 transition-all duration-200"
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={handleUpdateProduct}
                              className="mr-2 px-3 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 hover:shadow-lg hover:scale-110 transition-all duration-200"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingProduct(null)}
                              className="px-3 py-1 bg-gray-500 text-white text-xs rounded-md hover:bg-gray-600 hover:scale-110 transition-all duration-200"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg">
                                  <span className="text-white font-medium text-sm">
                                    {product.itemName?.charAt(0)?.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200">
                                  {product.itemName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transform hover:scale-110 transition-all duration-200 ${
                                parseInt(product.quantity || 0) < 10
                                  ? "bg-red-100 text-red-800 hover:bg-red-200 animate-pulse"
                                  : parseInt(product.quantity || 0) < 50
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }`}
                            >
                              {product.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate hover:text-gray-700 transition-colors duration-200">
                            {product.description}
                          </td>
                          <td className="px-6 py-4 text-right text-sm space-x-2">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="text-blue-600 hover:text-blue-800 font-medium hover:scale-110 transition-all duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(product._id)}
                              className="text-red-600 hover:text-red-800 font-medium hover:scale-110 transition-all duration-200"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

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
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }
        
        .animate-fade-in-row {
          animation: fade-in-row 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-count-up {
          animation: count-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
