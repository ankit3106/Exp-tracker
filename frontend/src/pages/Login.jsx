import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const { handleLogin } = useContext(AppContext);

  const [isModal, setIsModal] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleModalClose = () => {
    setIsModal(false);
    navigate('/'); // Redirect to home page on modal close
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleLogin(formData.email, formData.password);
  //   setIsModal(false);
  //   navigate('/'); // Redirect to home page on successful login
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(formData.email, formData.password);
    if (success) {
      setIsModal(false);
      navigate('/'); // Only navigate if login is successful
    }
    // If not successful, error toast will show and user stays on login
  }

  return (
    <>
      {
        isModal && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-96 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className='text-xl font-semibold'>Login</h2>
                <button onClick={handleModalClose} className='text-gray-600 hover:text-gray-800 text-2xl'>
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit} className='space-y-4' >
                <div >
                  <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>
                <div >
                  <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>
                <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200'>
                  Login
                </button>
              </form>

              <p className='text-sm text-center mt-4'>
                Don&apos;t have an account?{' '}
                <button onClick={() => navigate('/register')} className='text-blue-500 hover:underline'>Register</button>
              </p>
            </div>
          </div>

        )
      }
    </>
  )
}

export default Login