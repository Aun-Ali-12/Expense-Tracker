import { useExpense } from "@/Context/ExpenseData";

export function useFeatures() {
    const { expense, budget } = useExpense();

    const totalExpense = expense.reduce((sum, item) => {
        return sum + item.amount;
    }, 0);

    const balanceBudget = budget - totalExpense;
    
    return { budget, totalExpense, balanceBudget }
}