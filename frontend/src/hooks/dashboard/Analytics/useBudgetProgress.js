import { useExpense } from "@/Context/ExpenseData";
import { useFeatures } from "../useFeatures";

export default function useBudgetProgress() {
    const { budget } = useExpense();
    const { totalExpense, balanceBudget } = useFeatures()
    // percentage calculate 
    const rawPercentage = budget > 0 ? (Number(totalExpense) / Number(budget)) * 100 : 0;
    const percentage = Math.min(rawPercentage, 100);

    // color decide
    const getColor = () => {
        if (rawPercentage >= 90) return "#ef4444"; //budget exceeded or ended
        if (rawPercentage >= 75) return "#f59e0b"; //warning
        return "#22c55e"; //safezone
    };
    return { rawPercentage, percentage, getColor, totalExpense, budget, balanceBudget }
}
