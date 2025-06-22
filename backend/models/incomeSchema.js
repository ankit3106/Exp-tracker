import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const IncomeModel = mongoose.model.Income || mongoose.model("Income", incomeSchema);

export default IncomeModel;