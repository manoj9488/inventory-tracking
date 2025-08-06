import React from 'react'
import { useNavigate } from 'react-router-dom';

  

export default function admindashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {

    navigate('/');                
  };
  const navigatetoAddProduct = () => {
    navigate('/addproduct');
  };

  const navigatetouserdashboard = () => {
    navigate('/dashboard');
  };

  const products = [
    { name: 'Product 1', price: '$10' },
    { name: 'Product 2', price: '$20' },
    { name: 'Product 3', price: '$30' },
    { name: 'Product 4', price: '$40' },
    { name: 'Product 5', price: '$50' }

  ];
    

  return (   
    <>
    <div className='bg-gray-300'>admindashboard</div>
      <div>
          <h2>Product List</h2>
          <table classname ="min-w-full border-collapse block md:table">
            <thead classname="block md:table-header-group"></thead>
            <tbody classname="block md:table-row-group"></tbody>
            {products.map((product, index) => {
              return(
                <>
                 <tr key={index} className='bg-white border-b md:table-row'>
              <td className='p-2 md:table-cell'>{product.name}</td>
              <td className='p-2 md:table-cell'>{product.price}</td> 
              <td className='p-2 md:table-cell'>
                <button 
                  onclick ={() => alert("Editing " + product.name)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
              <td className='p-2 md:table-cell'>
                <button 
                  onClick={() => alert(`Deleting ${product.name}`)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td> 

            </tr></>
              )
            }
            
          
          )}    
          </table>
      </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Admin Actions</h2>
          <button 
            onClick={navigatetoAddProduct}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Product
          </button>
          <button 
            onClick={() => alert('Delete Product functionality not implemented yet')}
            className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        
          >
            Delete Product
          </button>
        </div>    
        <div className="mt-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button 
            onClick={navigatetouserdashboard}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            View Users
          </button>
          <button 
            onClick={() => alert('Delete User functionality not implemented yet')}
            className="mt-2 ml-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Delete User
          </button>        
        </div>
      
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Logs</h2>
          <button 
            onClick={() => alert('View Logs functionality not implemented yet')}
            className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            View Logs
          </button>
        </div>            
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Feedback</h2>
          <button 
            onClick={() => alert('View Feedback functionality not implemented yet')}
            className="mt-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
          >
            View Feedback
          </button>   
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Logout</h2>
          <button 
            onClick={handleLogout}
            className="mt-2 px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600"
          >
            Logout
          </button>   
        </div>
        
      </>
   

  )
}
