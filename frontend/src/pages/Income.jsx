import React from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Income = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const { addIncome, updateIncome } = useContext(AppContext)

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
    if (location.state && location.state.income) {
      setFormData(location.state.income);
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
    if (
      !formData.title ||
      !formData.amount ||
      !formData.type ||
      !formData.category ||
      !formData.description ||
      !formData.date
    ) {
      alert("All fields are required!");
      return;
    }
    const amount = Number(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Amount must be a positive number!");
      return;
    }
    if (formData._id) {
      // Update mode
      updateIncome(
        formData._id,
        formData.title,
        amount,
        formData.type,
        formData.category,
        formData.description,
        formData.date
      );
      navigate('/');
    } else {
      // Add mode
      addIncome(
        formData.title,
        amount,
        formData.type,
        formData.category,
        formData.description,
        formData.date,
        "income"
      );

    }
  };

  return (
    <div className='mx-auto max-w-2xl md:mt-6 bg-white p-6 rounded-md shadow-md'>
      <h1 className='text-2xl font-semibold text-gray-700 mb-4 '>Add Income</h1>
      <form onSubmit={handleSubmit} className='space-y-0.5'>
        <div className="mb-4 mt-4">
          <label className='block text-gray-700 mb-2'>Title</label>
          <input
            type="text"
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus-outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter income title'
            required
          />
        </div>

        <div className="mb-4 ">
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
        <div className="mb-4 ">
          <label className='mt-4 block text-gray-600 mb-2'>Income Type</label>
          <select value={formData.type} onChange={handleChange} name="type" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-300' required>
            <option value="" disabled>Select Type</option>
            <option value="salary">Salary</option>
            <option value="business">Business</option>
            <option value="investment">Investment</option>
            <option value="freelance">Freelance</option>
            <option value="rental">Rental Income</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4 ">
          <label className='mt-4 block text-gray-600 mb-2'>Category</label>
          <select value={formData.category} onChange={handleChange} name="category" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-300' required>
            <option value="" disabled>Select Category</option>
            <option value="monthly-salary">Monthly Salary</option>
            <option value="dividends">Dividends</option>
            <option value="consulting">Consulting</option>
            <option value="real-estate">Real Estate</option>
            <option value="side-hustle">Side Hustle</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4 ">
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

export default Income