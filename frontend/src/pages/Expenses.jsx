import React from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Expenses = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { addExpense, updateExpense } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: '',
    category: '',
    description: '',
    date: '',
    _id: ''
  })

  useEffect(() => {
    if (location.state && location.state.expense) {
      setFormData(location.state.expense);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData._id) {
      // Update mode
      updateExpense(
        formData._id,
        formData.title,
        formData.amount,
        formData.type,        
        formData.category,
        formData.description,
        formData.date
      );
      navigate('/');
    } else {
      // Add mode
      addExpense(
        formData.title,
        formData.amount,
        formData.type,        
        formData.category,
        formData.description,
        formData.date
      );
    }
    // Optionally navigate away or show a success message
  };

  return (
    <div className='mx-auto max-w-2xl md:mt-6 bg-white p-6 rounded-md shadow-md'>
      <h1 className='text-2xl font-semibold text-gray-700 mb-4 '>Add Expense</h1>
      <form onSubmit={handleSubmit} className='space-y-0.5'>
        <div className="mb-4">
          <label className='block text-gray-700 mb-2'>Title</label>
          <input
            type="text"
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus-outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter expense title'
            required
          />
        </div>

        <div className="mb-4">
          <label className='mt-4 block text-gray-700 mb-2'>Amount</label>
          <input
            type="number"
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus-outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter Amount'
            required
          />
        </div>
        <div className="mb-4">
          <label className='mt-4 block text-gray-600 mb-2'>Expense Type</label>
          <select value={formData.type} onChange={handleChange} name="type" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-300' required>
            <option value="" disabled>Select Type</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="utilities">Utilities</option>
            <option value="transportation">Transportation</option>
            <option value="healthCare">HealthCare</option>
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="mb-4">
          <label className='mt-4 block text-gray-600 mb-2'>Category</label>
          <select value={formData.category} onChange={handleChange} name="category" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-300' required>
            <option value="" disabled>Select Category</option>
            <option value="food">Food</option>
            <option value="bills">Bills</option>
            <option value="shopping">Shopping</option>
            <option value="transport">Transport</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="gifts">Gifts</option>
            <option value="personal">Personal</option>
            <option value="household">Household</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className='mt-4 block text-gray-700 mb-2'>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus-outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter a Description'
            rows="3"
            required
          >
          </textarea>
        </div>

        <div className="mb-4">
          <label className='mt-4 block text-gray-700 mb-2'>Date</label>
          <input
            type="date"
            name='date'
            value={formData.date}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus-outline-none focus:ring focus:ring-blue-300'
            required
          />
        </div>

        <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:to-blue-400'>Submit</button>
      </form>
    </div>
  )
}

export default Expenses