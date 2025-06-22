import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const { handleRegister } = useContext(AppContext);

  const [isModal, setIsModal] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const success = await handleRegister(formData.name, formData.email, formData.password);
    if (success) {
      setIsModal(false);
      navigate('/');
    }
    // If not successful, stay on modal and show error via toast
  }

  return (
    <>
      {
        isModal && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-96 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className='text-xl font-semibold'>Register</h2>
                <button onClick={handleModalClose} className='text-gray-600 hover:text-gray-800 text-2xl'>
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>
                <div>
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
                <div>
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
                <div>
                  <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700 mb-1'>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>
                <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200'>
                  Register
                </button>
              </form>

              <p className='text-sm text-center mt-4'>
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className='text-blue-500 hover:underline'>Login</button>
              </p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Register;
