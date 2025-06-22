import React, { useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'


ChartJS.register(ArcElement, Tooltip, Legend, Title)

const History = () => {

  const { IncomeData, ExpenseData } = useContext(AppContext)

  const parsePrice = (price) => {
    return typeof price === 'number' ? price : parseFloat(price.replace(/[^0-9.-]+/g, ''))
  }

  const [minIncome, setMinIncome] = useState(0)
  const [maxIncome, setMaxIncome] = useState(0)
  const [minExpense, setMinExpense] = useState(0)
  const [maxExpense, setMaxExpense] = useState(0)

  useEffect(() => {
    const incomePrices = IncomeData.map(item => parsePrice(item.amount))
    const expensePrices = ExpenseData.map(item => parsePrice(item.amount))

    setMinIncome(incomePrices.length ? Math.min(...incomePrices) : 0)
    setMaxIncome(incomePrices.length ? Math.max(...incomePrices) : 0)
    setMinExpense(expensePrices.length ? Math.min(...expensePrices) : 0)
    setMaxExpense(expensePrices.length ? Math.max(...expensePrices) : 0)

  },)

  const chartData = {
    labels: [
      'Total Income',
      'Total Expense',
      'Min Income',
      'Max Income',
      'Min Expense',
      'Max Expense'
    ],
    datasets: [
      {
        data: [
          IncomeData.reduce((sum, item) => sum + parsePrice(item.amount), 0),
          ExpenseData.reduce((sum, item) => sum + parsePrice(item.amount), 0),
          minIncome,
          maxIncome,
          minExpense,
          maxExpense
        ],
        backgroundColor: [
          "#36A2EB", // Total Income
          "#FF6384", // Total Expense
          "#4BC0C0", // Min Income
          "#FFCE56", // Max Income
          "#9966FF", // Min Expense
          "#FF9F40"  // Max Expense
        ],
        hoverBackgroundColor: [
          "#66B3FF", // Total Income
          "#FF9F9F", // Total Expense
          "#70D8D8", // Min Income
          "#FFD966", // Max Income
          "#B38FFF", // Min Expense
          "#FFB673"  // Max Expense
        ],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: ''
      },
      legend: {
        position: 'bottom',
      }
    },
  }

  return (
    <div className="w-full hidden lg:block mx-auto p-4">
      <h1 className='text-3xl font-semibold text-center mb-4'>Recent History</h1>

      <h2 className="text-xl font-semibold mb-2 text-green-600">Income</h2>
      <div className="space-y-3 h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 pr-2 mb-6">
        {IncomeData.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-white rounded-md shadow border border-gray-100 hover:shadow-xl transition">
            <div>
              <h3 className='text-base font-medium text-gray-800'>{item.title}</h3>
              <p className='text-xs text-gray-500'>$ {item.amount}</p>
            </div>
            <div className="text-base font-semibold text-green-500">${item.amount}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2 text-red-500">Expense</h2>
      <div className="space-y-3 h-40 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 pr-2 mb-6">
        {ExpenseData.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-white rounded-md shadow border border-gray-100 hover:shadow-xl transition">
            <div>
              <h3 className='text-base font-medium text-gray-800'>{item.title}</h3>
              <p className='text-xs text-gray-500'>$ {item.amount}</p>
            </div>
            <div className="text-base font-semibold text-red-500">${item.amount}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow p-6">
        <h2 className='text-xl font-semibold mb-4 text-center'>Financial Overview</h2>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default History