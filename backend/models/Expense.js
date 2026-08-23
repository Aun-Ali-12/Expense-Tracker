import mongoose from "mongoose";

//expense schema
const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //ref to get id from
      required: true,
    },

    note: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
  },
);

//expense model:
const expenseModel = mongoose.model("expense", expenseSchema);
export default expenseModel;
