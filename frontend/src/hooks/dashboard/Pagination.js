import { useState } from "react"
import { useExpense } from "@/Context/ExpenseData";


export default function usePagination() {
    const { expense } = useExpense();
    const [page, setPage] = useState(1); //at first page will be 1
    const [limit, setLimit] = useState(10); //total record to show

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedExpense =
        limit === "all" ? expense : expense.slice(startIndex, endIndex);

    const totalPages = Math.ceil(expense.length / limit);

    return { page, setPage, limit, setLimit, paginatedExpense, totalPages, expense }
}