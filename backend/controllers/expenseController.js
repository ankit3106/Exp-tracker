import ExpenseModel from "../models/expenseSchema.js";


const addExpense = async (req, res) => {
    const userId = req.user?.id

    const { title, amount, type, category, description, date } = req.body;
    const parsedAmount = Number(amount);

    // Validate input

    try {
        if (!title || !date || !category || !description || !type) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }

        const newExpense = new ExpenseModel({
            userId,
            title,
            amount,
            type,
            category,
            description,
            date,
        });

        await newExpense.save();

        res.status(200).json({ success: true, message: "Expense added successfully", data: newExpense });
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, category, description } = req.body;

    try {

        const expenseUpdate = await ExpenseModel.findById(id);

        if (!expenseUpdate) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        expenseUpdate.title = title || expenseUpdate.title;
        expenseUpdate.amount = amount || expenseUpdate.amount;
        expenseUpdate.category = category || expenseUpdate.category;
        expenseUpdate.description = description || expenseUpdate.description;
        expenseUpdate.date = date || expenseUpdate.date;

        await expenseUpdate.save();

        res.status(200).json({ success: true, message: "Expense updated successfully", data: expenseUpdate });

    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteExpense = await ExpenseModel.findByIdAndDelete(id);

        if (!deleteExpense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        res.status(200).json({ success: true, message: "Expense deleted successfully", deleteExpense });

    }
    catch (error) {
        console.error("Error deleting deleteExpense:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getExpense = async (req, res) => {

    try {
        const userId = req.user?.id;
        const getExpense = await ExpenseModel.find({ userId: userId });

        if (!getExpense || getExpense.length === 0) {
            return res.status(404).json({ success: false, message: "No Expense found" });
        }

        res.status(200).json({ success: true, message: "Expense retrieved successfully", data: getExpense });
    } catch (error) {
        console.error("Error retrieving incomes:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export { addExpense, deleteExpense, updateExpense, getExpense };