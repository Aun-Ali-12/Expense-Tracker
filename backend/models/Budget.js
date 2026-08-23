import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const budgetModel = mongoose.model("Budget", budgetSchema);
export default budgetModel;
