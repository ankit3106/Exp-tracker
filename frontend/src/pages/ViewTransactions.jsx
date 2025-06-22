import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const ViewTransactions = () => {

  const { IncomeData, ExpenseData } = useContext(AppContext)

  // const allTransactions = [...IncomeData, ...ExpenseData]

  const allTransactions = [
    ...IncomeData.map(item => ({ ...item, transactionType: "income" })),
    ...ExpenseData.map(item => ({ ...item, transactionType: "expense" }))
  ];


  return (
    <div className="max-w-full p-4 mt-14 mx-9">
      <h1 className="text-3xl font-semibold mb-6 text-start">Transactions</h1>
      <div className="overflow-x-auto pr-8">
        <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {allTransactions.map((transaction, index) => (
              <tr key={index} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                <td>{transaction.title}</td>
                <td>{transaction.category}</td>
                <td>{(new Date(transaction.date)).toLocaleDateString()}</td>
                <td>{transaction.transactionType === "income" ? "Income" : "Expense"}</td>
                <td className={`p-4 text-right font-semibold ${transaction.transactionType === "income" ? "text-green-500" : "text-red-500"}`}>
                  ${transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewTransactions