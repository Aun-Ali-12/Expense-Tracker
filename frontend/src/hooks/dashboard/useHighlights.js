import { useExpense } from "@/Context/ExpenseData";

export function useHighlights() {
    const { expense, budget } = useExpense();

    //total spendings category wise:
    const uniqueCategory = [...new Set(expense.map((e) => e.category))]

    const totalSpendingCategoryWise = uniqueCategory.map((i) => ({
        category: i,
        amount: expense.filter((c) => c.category === i).reduce((acc, item) => acc + item.amount, 0)
    }))
    return { totalSpendingCategoryWise }
}