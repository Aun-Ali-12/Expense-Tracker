import { useExpense } from "@/Context/ExpenseData";

export function useFeatures() {
    //useExpense context
    const { expense, budget } = useExpense();
    //makes array of unique category 
    const uniqueCategory = [...new Set(expense.map((e) => e.category))]

    //total Expense of the user 
    const totalExpense = expense.reduce((sum, item) => {
        return sum + item.amount;
    }, 0);

    //remaining budget of the user
    const balanceBudget = budget - totalExpense;

    //total spendings category wise:
    const totalSpendingCategoryWise = uniqueCategory.map((i) => ({
        category: i,
        amount: expense.filter((c) => c.category === i).reduce((acc, item) => acc + item.amount, 0)
    }))


    //highest spending item from each category:
    const highestSpendingItem = uniqueCategory.map((c) => {

        //returns whole object of expense category wise
        const itemsInCategory = expense.filter((i) => i.category === c)

        //creates object in which returns every item with its overall spendings
        const itemTotal = itemsInCategory.reduce((acc, item) => {
            const itemName = item.note.toLowerCase().trim() //converts note in lowercase and removes extra space

            //if acc already has  
            if (!acc[itemName]) {
                acc[itemName] =
                {
                    note: item.note,
                    totalAmount: 0
                }

            }
            acc[itemName].totalAmount += item.amount
            return acc
        }, {})


        //takes out highest spended item of each category
        const highestItem = Object.values(itemTotal).reduce((max, item) => {
            return item.totalAmount > max.totalAmount ? item : max
        })

        //data returned by map
        return {
            category: c,
            highestItem
        }
    })
    return { expense, budget, totalExpense, balanceBudget, totalSpendingCategoryWise, highestSpendingItem }
}