import React from 'react'
import logo from '../assets/logo.png'
import { GoGraph } from 'react-icons/go'
import { FaRegCreditCard } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { GiExpense } from 'react-icons/gi'
import { IoLogOut } from 'react-icons/io5'
import { FaArrowsDownToLine, FaArrowsUpToLine } from 'react-icons/fa6'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import cookie from 'js-cookie'


// const SideBar = () => {

//   const { token, setToken } = useContext(AppContext)

//   const navigate = useNavigate()

//   const handleLogout = () => {
//     setToken(false)
//     cookie.remove('token')
//     navigate('/login')
//   }



//   return (
//     <div className='bg-gradient-to-b from-black to-gray-700 h-screen'>
//       <div className="mt-3 py-2 px-2">
//         <img src={logo} onClick={() => navigate('/')} alt='logo' className='mt-1 w-44 hidden cursor-pointer md:block' />
//         <img src={logo} onClick={() => navigate('/')} alt='logo' className='w-12 block cursor-pointer md:hidden' />
//       </div>

//       <div className="flex flex-row items-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 justify-center gap-5 py-2 px-2">
//         <NavLink to={'/'} className='w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 text-white'>
//           <GoGraph className='text-2xl text-white' />
//           <p className='text-lg font-semibold hidden md:block text-white'>
//             Dashboard
//           </p>
//         </NavLink>
//       </div>
//       <div className="flex flex-row items-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 justify-center gap-5 py-2 px-2">
//         <NavLink to={'/view-transactions'} className='w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 text-white'>
//           <FaRegCreditCard className='text-2xl text-white' />
//           <p className='text-lg font-semibold hidden md:block text-white'>
//             Transactions
//           </p>
//         </NavLink>
//       </div>
//       <div className="flex flex-row items-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 justify-center gap-5 py-2 px-2">
//         <NavLink to={'/income-transactions'} className='w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 text-white'>
//           <FaArrowsDownToLine className='text-2xl text-white' />
//           <p className='text-lg font-semibold hidden md:block text-white'>
//             Income History
//           </p>
//         </NavLink>
//       </div>
//       <div className="flex flex-row items-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 justify-center gap-5 py-2 px-2">
//         <NavLink to={'/expense-transactions'} className='w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 text-white'>
//           <FaArrowsUpToLine className='text-2xl text-white' />
//           <p className='text-lg font-semibold hidden md:block text-white'>
//             Expense History
//           </p>
//         </NavLink>
//       </div>
//       <div className="flex flex-row items-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 justify-center gap-5 py-2 px-2">
//         <NavLink to={'/add-income'} className='w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 text-white'>
//           <FaMoneyBillTrendUp className='text-2xl text-white' />
//           <p className='text-lg font-semibold hidden md:block text-white'>
//             Income
//           </p>
//         </NavLink>
//       </div>
//       <div className="flex flex-row items-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 justify-center gap-5 py-2 px-2">
//         <NavLink to={'/add-expense'} className='w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 text-white'>
//           <GiExpense className='text-2xl text-white' />
//           <p className='text-lg font-semibold hidden md:block text-white'>
//             Expense
//           </p>
//         </NavLink>
//       </div>
//       <div className="flex flex-row items-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 justify-center gap-5 py-2 px-2">
//         {token ?
//           <NavLink onClick={
//             handleLogout
//           }
//            className='w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 text-white'>
//             <IoLogOut className='text-2xl text-white' />
//             <p className='text-lg font-semibold hidden md:block text-white'>
//               LogOut
//             </p>
//           </NavLink> :
//           <NavLink to={'/login'} className='w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-800 text-white'>
//             <IoLogOut className='text-2xl text-white' />
//             <p className='text-lg font-semibold hidden md:block text-white'>
//               Login
//             </p>
//           </NavLink>
//         }
//       </div>

//     </div>
//   )
// }

// export default SideBar

// ...existing imports...

const navItemClass =
  "w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer mb-2 " +
  "hover:bg-gray-800 hover:text-white";

const activeNavItemClass = "bg-gray-800 text-white shadow";

const SideBar = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(false);
    cookie.remove('token');
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 h-screen w-64 shadow-lg border-r border-gray-700 flex flex-col">
      <div className="py-6 px-6 flex flex-col items-center border-b border-gray-700">
        <img
          src={logo}
          onClick={() => navigate('/')}
          alt="logo"
          className="w-32 mb-2 cursor-pointer rounded-full shadow-lg "
        />
      </div>
      <nav className="flex-1 flex flex-col px-4 py-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeNavItemClass : "text-gray-300"}`
          }
        >
          <GoGraph className="text-2xl" />
          <span className="text-lg font-semibold hidden md:block">Dashboard</span>
        </NavLink>
        <NavLink
          to="/view-transactions"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeNavItemClass : "text-gray-300"}`
          }
        >
          <FaRegCreditCard className="text-2xl" />
          <span className="text-lg font-semibold hidden md:block">Transactions</span>
        </NavLink>
        <NavLink
          to="/income-transactions"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeNavItemClass : "text-gray-300"}`
          }
        >
          <FaArrowsDownToLine className="text-2xl" />
          <span className="text-lg font-semibold hidden md:block">Income History</span>
        </NavLink>
        <NavLink
          to="/expense-transactions"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeNavItemClass : "text-gray-300"}`
          }
        >
          <FaArrowsUpToLine className="text-2xl" />
          <span className="text-lg font-semibold hidden md:block">Expense History</span>
        </NavLink>
        <NavLink
          to="/add-income"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeNavItemClass : "text-gray-300"}`
          }
        >
          <FaMoneyBillTrendUp className="text-2xl" />
          <span className="text-lg font-semibold hidden md:block">Income</span>
        </NavLink>
        <NavLink
          to="/add-expense"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeNavItemClass : "text-gray-300"}`
          }
        >
          <GiExpense className="text-2xl" />
          <span className="text-lg font-semibold hidden md:block">Expense</span>
        </NavLink>
        {token ? (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer mt-4 bg-red-600 text-white hover:bg-red-700"
          >
            <IoLogOut className="text-2xl" />
            <span className="text-lg font-semibold hidden md:block">LogOut</span>
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${navItemClass} mt-4 ${isActive ? activeNavItemClass : "text-gray-300"}`
            }
          >
            <IoLogOut className="text-2xl" />
            <span className="text-lg font-semibold hidden md:block">Login</span>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default SideBar;