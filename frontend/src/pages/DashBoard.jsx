// import React from 'react'
import Chart from '../components/Chart'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'


const DashBoard = () => {

  const { IncomeData, ExpenseData } = useContext(AppContext)

  const totalIncome = IncomeData.reduce((sum, item) => sum + parseFloat(item.amount), 0)
  const totalExpense = ExpenseData.reduce((sum, item) => sum + parseFloat(item.amount), 0)

  const totalBalance = totalIncome - totalExpense


  const navigate = useNavigate()

  return (
    <>
      <Chart IncomeData={IncomeData} ExpenseData={ExpenseData} />

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch overflow-visible my-8">
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-3 w-full md:w-56 transition-transform duration-200 hover:scale-105">
          <h1 className="font-bold text-xs md:text-lg text-gray-700">Total Income</h1>
          <p className="text-xl text-green-600 font-bold mt-2">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between p-3 w-full md:w-56 transition-transform duration-200 hover:scale-105">
          <h1 className="font-bold text-xs md:text-lg text-gray-700">Total Expense</h1>
          <p className="text-xl text-red-600 font-bold mt-2">${totalExpense.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex justify-center items-center md:mt-15">
        <div className="-mt-3 flex flex-col items-center justify-between bg-white shadow-xl rounded-lg p-4 w-full max-w-sm transition-shadow duration-200 hover:scale-105">
          <h1 className="font-bold text-base md:text-2xl text-gray-800 mb-4">Total Balance</h1>
          <p className={`font-medium text-2xl md:text-5xl ${totalBalance < 0 ? 'text-red-600' : 'text-green-600'}`}>
            ${totalBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  )
}

export default DashBoard