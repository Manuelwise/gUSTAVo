import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

<<<<<<< HEAD
=======

>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
<<<<<<< HEAD
    const { success, user } = await login(credentials);
    if(success){
      navigate(user.role === 'Admin' ? '/admin/dashboard' : '/user/dashboard');
=======
    const success = await login(credentials);
    if(success){
      navigate('/admin/dashboard');
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
    }else{
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen px-8 py-16  justify-center bg-gradient-to-br from-yellow-500 via-black to-white">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
<<<<<<< HEAD
        <h2 className="text-2xl font-bold mb-6">Login</h2>
=======
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
>>>>>>> b56182316c66f8bac9af551575b1b95d19810da6
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-20">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;