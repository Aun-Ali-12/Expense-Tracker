import budgetModel from "../../models/Budget.js"

//set budget
export const insertBudget = async (req, res) => {
    const userId = req.userId

    const { month, amount } = req.body
    console.log(amount);
    console.log(month);


    try {
        const setBudget = await budgetModel.findOneAndUpdate(
            { userId, month },
            { amount },
            { new: true, upsert: true }
        )
        if (!setBudget) {
            console.log("error mn", setBudget);

            return res.status(404).json({ message: "couldn't set the budget, try again!" })
        }
        console.log("success mn", setBudget);

        return res.status(200).json({ message: "Successfully set the budget", data: setBudget })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: `something wen't wrong ${err.message}` })
    }
}

//get budget
export const fetchBudget = async (req, res) => {

    const userId = req.userId
    const month = new Date().toISOString().slice(0, 7)

    try {
        const getBudget = await budgetModel.findOne({ userId, month })
        if (!getBudget) {
            console.log("get budget error", getBudget);
            return res.status(404).json({ message: "No budget added yet!" })
        }
        console.log("success", getBudget);
        return res.status(200).json({ message: `Your Budget: ${getBudget.amount}`, data: getBudget.amount })

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Something wen't wrong" })
    }
}