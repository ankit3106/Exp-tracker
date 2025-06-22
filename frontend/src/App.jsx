import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import SideBar from './components/SideBar'
import DashBoard from './pages/DashBoard'
import History from './components/History'
import ViewTransactions from './pages/ViewTransactions'
import Income from './pages/Income'
import Expenses from './pages/Expenses'
import IncomeTransactions from './pages/IncomeTransactions'
import ExpenseTransactions from './pages/ExpenseTransactions'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'



// const App = () => {

//   const location = useLocation()
//   const { token, fetchIncome, fetchExpense } = useContext(AppContext)

//   const hideMainLayout = ["/view-transactions", "/add-income", "/add-expense", "/income-transactions", "/expense-transactions", "/login", "/register"].includes(location.pathname)

//   useEffect(() => {
//     if (token) {
//       fetchIncome()
//       fetchExpense()
//     }
//   }, [token, location.pathname])

//   return (
//     <div className='flex flex-col'>
//       <ToastContainer />
//       {!hideMainLayout ? (
//         <div className='flex flex-row w-full overflow-auto'>
//           <SideBar />
//           <div className="min-h-screen">
//           </div>
//           <div className='flex-1 w-1/2'>
//             <Routes>
//               <Route path="/" element={<DashBoard />} />
//             </Routes>
//           </div>
//           <div className='flex-2 flex-col md:w-1/3 hidden lg:flex overflow-auto'>
//             <Routes>
//               <Route path="/" element={<History />} />
//             </Routes>
//           </div>
//         </ div >
//       ) : (
//         <div className='flex-1 w-full max-h-screen overflow-auto'>
//           <Routes>
//             <Route path="/view-transactions" element={<ViewTransactions />} />
//             <Route path="/add-income" element={<Income />} />
//             <Route path="/add-expense" element={<Expenses />} />
//             <Route path="/income-transactions" element={<IncomeTransactions />} />
//             <Route path="/expense-transactions" element={<ExpenseTransactions />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />


//           </Routes>
//         </div>
//       )}
//     </div>
//   )
// }

// export default App


const App = () => {
  const location = useLocation()
  const { token, fetchIncome, fetchExpense } = useContext(AppContext)

  // Hide sidebar for login/register
  const hideSideBar = ["/login", "/register"].includes(location.pathname)

  useEffect(() => {
    if (token) {
      fetchIncome()
      fetchExpense()
    }
  }, [token, location.pathname])

  return (
    <div className='flex flex-col'>
      <ToastContainer />
      <div className='flex flex-row w-full overflow-auto'>

        {/* Sidebar - shown only when not on login/register */}
        {!hideSideBar && (
          <div className="w-64 min-h-screen">
            <SideBar />
          </div>
        )}

        {/* Main content */}
        <div className='flex-1 w-full max-h-screen overflow-auto'>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/view-transactions" element={<ViewTransactions />} />
            <Route path="/add-income" element={<Income />} />
            <Route path="/add-expense" element={<Expenses />} />
            <Route path="/income-transactions" element={<IncomeTransactions />} />
            <Route path="/expense-transactions" element={<ExpenseTransactions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        {/* History - only show if not on login/register */}
        {!hideSideBar && location.pathname === "/" && (
          <div className='flex-2 flex-col md:w-1/3 hidden lg:flex overflow-auto'>
            <History />
          </div>
        )}
      </div>
    </div>
  )
}

export default App