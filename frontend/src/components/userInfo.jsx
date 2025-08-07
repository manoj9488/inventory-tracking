import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const navigate = useNavigate();

  const ruturn = () => {
    navigate('/admindashboard');
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/registration/users');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error when fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/registration/user/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = [...new Set(users.map(user => user.role))];

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800 border-red-200',
      user: 'bg-blue-100 text-blue-800 border-blue-200',
      manager: 'bg-green-100 text-green-800 border-green-200',
      default: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[role.toLowerCase()] || colors.default;
  };

  const getRoleIcon = (role) => {
    const icons = {
      admin: '👑',
      user: '👤',
      manager: '👨‍💼',
      default: '🔹'
    };
    return icons[role.toLowerCase()] || icons.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={ruturn} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">Back</button>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">👥</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage and view all registered users</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-6 text-center">
                <div className="bg-purple-50 rounded-lg p-4 transform hover:scale-105 transition-transform duration-200">
                  <div className="text-2xl font-bold text-purple-600">{users.length}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 transform hover:scale-105 transition-transform duration-200">
                  <div className="text-2xl font-bold text-pink-600">{uniqueRoles.length}</div>
                  <div className="text-sm text-gray-600">User Roles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 animate-slide-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-900">User Directory</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role} className="capitalize">
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-fade-in-up">
          {loading ? (
            <div className="text-center py-20">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-20">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr 
                      key={user._id}
                      className="hover:bg-gradient-to-r hover:from-purple-25 hover:to-pink-25 transition-all duration-300 transform hover:scale-[1.01] animate-fade-in-row"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4 shadow-lg">
                            <span className="text-white font-bold text-lg">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)} <span className="ml-1 capitalize">{user.role}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="hover:text-red-800 transition duration-150"
                        >
                           Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
