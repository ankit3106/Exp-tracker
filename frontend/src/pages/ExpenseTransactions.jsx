import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const ExpenseTransactions = () => {

  const navigate = useNavigate();

  const { ExpenseData, deleteExpense } = useContext(AppContext)
  const [deleteId, setDeleteId] = useState(null)

  const handleDelete = (id) => {
    deleteExpense(id)
    setDeleteId(null)
  }

  return (
    <div className="max-w-full p-4 mt-14 mx-9">
      <h1 className="text-3xl font-semibold mb-6 text-start">Expense Transactions</h1>
      <div className="overflow-x-auto pr-8">
        <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-right">Amount</th> {/* <-- text-right here */}
              <th className="p-4 text-center">Actions</th> {/* <-- text-right for actions */}
            </tr>
          </thead>
          <tbody>
            {ExpenseData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">No expense transactions found.</td>
              </tr>
            )}
            {ExpenseData.map((transaction, index) => (
              <tr className="border-b last:border-none hover:bg-gray-50 transition-colors align-middle" key={index}>
                <td className="p-4 align-middle">{transaction.title}</td>
                <td className="p-4 align-middle">{transaction.category}</td>
                <td className="p-4 align-middle">{(new Date(transaction.date)).toLocaleDateString()}</td>
                <td className="p-4 text-right text-red-500 font-semibold align-middle">
                  ${Number(transaction.amount).toFixed(2)}
                </td>
                <td className="p-4 text-right align-middle">
                  <button
                    aria-label="Delete transaction"
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => setDeleteId(transaction._id)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                  <button
                    aria-label="Update transaction"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => {
                      // Add your update logic here
                      navigate('/add-expense', { state: { expense: transaction } });
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this expense?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => setDeleteId(null)}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDelete(deleteId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpenseTransactions