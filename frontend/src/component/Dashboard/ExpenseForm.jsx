"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExpenseForm({
  formData,
  handleChange,
  handleSubmit,
  edit,
  isEdit,
}) {
  const router = useRouter();
  useEffect(() => {
    //auth check on frontend
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div>
        <h1>Expense</h1>
        <form onSubmit={handleSubmit}>
          <h1> Add Your Expense</h1>
          <label htmlFor="note">
            add note:
            <input
              type="text"
              name="note"
              value={isEdit ? edit.note : formData.note}
              id="note"
              onChange={handleChange}
              placeholder="name of an item.."
            />
          </label>
          <br />
          <label htmlFor="amount">
            add amount:{" "}
            <input
              type="number"
              name="amount"
              value={isEdit ? edit.amount : formData.amount}
              id="amount"
              onChange={handleChange}
            />
          </label>
          <br />
          {/* <label htmlFor="category">
            select category:{" "}
            <select
              name="category"
              id="category"
              value={expense.category}
              onChange={handleChange}
            >
              <option value="">select category</option>
              <option value="grocery">grocery</option>
              <option value="fun">fun</option>
            </select>
          </label> */}

          <label htmlFor="date">
            <input
              type="date"
              name="date"
              value={isEdit ? edit.date : formData.date}
              id="date"
              onChange={handleChange}
            />
          </label>
          <button type="submit">add</button>
        </form>
      </div>
    </>
  );
}
