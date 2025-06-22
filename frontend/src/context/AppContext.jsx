import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

  const navigate = useNavigate()

  const [ExpenseData, setExpenseData] = useState([])
  const [IncomeData, setIncomeData] = useState([])

  const [token, setToken] = useState(Boolean(cookie.get("token")))

  const backendUrl = "http://localhost:4000"

  // const utoken = cookie.get("token")

  const fetchIncome = async () => {
    try {
      const utoken = cookie.get("token")
      if (!utoken || typeof utoken !== "string") throw new Error("Token missing or invalid");
      const decodedToken = jwtDecode(utoken);
      const userId = decodedToken?.id;

      if (!userId) {
        console.error("User ID not found in token");
        return;
      }
      const { data } = await axios.get(`${backendUrl}/api/users/get-income`, {
        headers: {
          "Authorization": `Bearer ${utoken}`
        }
      })
      if (data.success) {
        setIncomeData(data.data)
      }
      else {
        console.error("Failed to fetch income data:", data.message);
      }
    }
    catch (error) {
      console.error("Error fetching income data:", error);

    }
  }

  const fetchExpense = async () => {
    try {
      const utoken = cookie.get("token");
      if (!utoken || typeof utoken !== "string") throw new Error("Token missing or invalid");
      const decodedToken = jwtDecode(utoken);
      const userId = decodedToken?.id;

      if (!userId) {
        console.error("User ID not found in token");
        return;
      }
      const { data } = await axios.get(`${backendUrl}/api/users/get-expense`, {
        headers: {
          "Authorization": `Bearer ${utoken}`
        }
      })
      if (data.success) {
        setExpenseData(data.data)
      }
      else {
        console.error("Failed to fetch expense data:", data.message);
      }
    }
    catch (error) {
      console.error("Error fetching expense data:", error);

    }
  }

  const addIncome = async (title, amount, type, category, description, date) => {
    try {
      const utoken = cookie.get("token");
      if (!utoken || typeof utoken !== "string") throw new Error("Token missing or invalid");

      const { data } = await axios.post(`${backendUrl}/api/users/add-income`, {
        title,
        amount,
        type,
        category,
        description,
        date
      }, {
        headers: {
          "Authorization": `Bearer ${utoken}`
        }
      })
      if (data.success) {
        toast.success(data.message || "Income added successfully!")
        fetchIncome() // Refresh income data after adding
        navigate("/")
      }
    }
    catch (error) {
      console.error("Error adding income:", error);
    }
  }

  const addExpense = async (title, amount, type, category, description, date) => {
    try {
      const utoken = cookie.get("token");
      if (!utoken || typeof utoken !== "string") throw new Error("Token missing or invalid");
      const { data } = await axios.post(`${backendUrl}/api/users/add-expense`, {
        title,
        amount,
        type,
        category,
        description,
        date
      }, {
        headers: {
          "Authorization": `Bearer ${utoken}`
        }
      })
      if (data.success) {
        toast.success(data.message || "Expense added successfully!")
        fetchExpense() // Refresh expense data after adding
        navigate("/")
      }
    }
    catch (error) {
      console.error("Error adding expense:", error);
    }
  }

  const updateIncome = async (id, title, amount, income, category, description, date) => {
    try {
      const utoken = cookie.get("token");
      if (!utoken || typeof utoken !== "string") throw new Error("Token missing or invalid");
      const { data } = await axios.put(`${backendUrl}/api/users/update-income/${id}`, {
        title,
        amount,
        income,
        category,
        description,
        date
      }, {
        headers: {
          "Authorization": `Bearer ${utoken}`
        }
      })
      if (data.success) {
        toast.success(data.message || "Income updated successfully!")
        fetchIncome() // Refresh income data after updating
        // navigate("/")
      }
    }
    catch (error) {
      console.error("Error updating income:", error);
    }
  }

  const updateExpense = async (id, title, amount, expense, category, description, date) => {
    try {
      const utoken = cookie.get("token");
      if (!utoken || typeof utoken !== "string") throw new Error("Token missing or invalid");
      const { data } = await axios.put(`${backendUrl}/api/users/update-expense/${id}`, {
        title,
        amount,
        expense,
        category,
        description,
        date
      }, {
        headers: {
          "Authorization": `Bearer ${utoken}`
        }
      })
      if (data.success) {
        toast.success(data.message || "Expense updated successfully!")
        fetchExpense() // Refresh expense data after updating
        // navigate("/")
      }
    }
    catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  const deleteIncome = async (id) => {
    try {
      const utoken = cookie.get("token");
      if (!utoken || typeof utoken !== "string") throw new Error("Token missing or invalid");
      const { data } = await axios.delete(`${backendUrl}/api/users/delete-income/${id}`, {
        headers: {
          "Authorization": `Bearer ${utoken}`
        }
      })
      if (data.success) {
        toast.success(data.message || "Income deleted successfully!")
        fetchIncome() // Refresh income data after deleting
      }
    }
    catch (error) {
      console.error("Error deleting income:", error);
    }
  }

  const deleteExpense = async (id) => {
    try {
      const utoken = cookie.get("token");
      if (!utoken || typeof utoken !== "string") throw new Error("Token missing or invalid");
      const { data } = await axios.delete(`${backendUrl}/api/users/delete-expense/${id}`, {
        headers: {
          "Authorization": `Bearer ${utoken}`
        }
      })
      if (data.success) {
        toast.success(data.message || "Expense deleted successfully!")
        fetchExpense() // Refresh expense data after deleting
      }

    }
    catch (error) {
      console.error("Error deleting expense:", error);

    }
  }


  const handleRegister = async (name, email, password) => {
    try {

      const { data } = await axios.post(`${backendUrl}/api/users/register`, {
        name,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (data.success) {
        cookie.set("token", data.token, { expires: 7 }) // Set cookie for 7 days
        setToken(true)
        fetchIncome()
        fetchExpense()

        toast.success(data.message || "Registration successful!")
        return true;

        // navigate("/")
      }
      else {
        console.error("Registration failed:", data.message);
      }
    }
    catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // const handleLogin = async (email, password) => {
  //   try {

  //     const { data } = await axios.post(`${backendUrl}/api/users/login`, {
  //       email,
  //       password
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })

  //     if (data.success) {
  //       console.log(data);
  //       cookie.set("token", data.token, { expires: 7 }) // Set cookie for 7 days
  //       setToken(true)
  //       fetchIncome()
  //       fetchExpense()


  //       toast.success(data.message || "Login successful!")

  //       navigate("/")
  //     }
  //     else {
  //       console.error("Login failed:", data.message);
  //     }
  //   }
  //   catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // }

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/users/login`, {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (data.success) {
        cookie.set("token", data.token, { expires: 7 }) // Set cookie for 7 days
        setToken(true)
        fetchIncome()
        fetchExpense()
        toast.success(data.message || "Login successful!")
        return true; // Indicate success
      } else {
        toast.error(data.message || "Login failed")
        return false; // Indicate failure
      }
    }
    catch (error) {
      toast.error("Error during login")
      return false; // Indicate failure
    }
  }

  useEffect(() => {
    const utoken = cookie.get("token");

    if (utoken && typeof utoken === "string") {
      axios.defaults.headers.common['Authorization'] = `Bearer ${utoken}`;
      setToken(true);
      fetchIncome();
      fetchExpense();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setToken(false);
    }
  }, []);


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.get("token")}`;
    }
    else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token])

  const values = {
    backendUrl,
    handleRegister,
    handleLogin,
    fetchExpense,
    fetchIncome,
    addExpense,
    addIncome,
    updateExpense,
    updateIncome,
    deleteExpense,
    deleteIncome,
    IncomeData,
    ExpenseData,
    token,
    setToken
  }

  return (
    <AppContext.Provider value={values} >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
// This file creates a context for the application, allowing components to share state and functions easily.