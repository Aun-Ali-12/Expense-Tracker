import expenseModel from "../../models/Expense.js"
import learnedCategoryModel from "../../models/LearnedCategory.js"
import detectCategory from "../../utility/categoryMap.js";
import { detectCategoryWithAI } from "../../utility/gemini.js";


//add expense in collection (expense)
export const addExpenseController = async (req, res) => {

    const { note, amount, date } = req.body
    const userId = req.userId
    const lowerNote = note.toLowerCase().trim()

    try {
        //detect category function
        let category = detectCategory(lowerNote)

        //if category is null, find first in db then api call
        if (!category) {

            const learned = await learnedCategoryModel.findOne({ keyword: lowerNote })

            //if already in db, reassign to category variable
            if (learned) {
                category = learned.category
            } else {
                //otherwise hit api
                category = await detectCategoryWithAI(lowerNote)

                //then add category in db
                await learnedCategoryModel.create({
                    keyword: lowerNote,
                    category: category
                })
            }
        }

        //add expense in db
        const addExpense = await expenseModel.create({
            userId, note: lowerNote, category, amount, date
        })

        if (!addExpense) {
            return res.status(400).json({ message: "Couldn't add expense, try again!" })
        }
        res.status(200).json({ message: "expense added successfully" })
    }
    catch (err) {
        return res.status(400).json({ message: "Something wen't wrong, try again!" })
    }
}

//fetches specific user's data
export const getData = async (req, res) => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const startOfMonth = new Date(year, month - 1, 1)
    const endOfMonth = new Date(year, month, 1)
    console.log(startOfMonth);
    console.log(endOfMonth);

    try {
        //fetch user's data
        const expenseData = await expenseModel.find({
            userId: req.userId,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({ date: -1 })

        //check if data is empty
        if (expenseData.length === 0) {
            return res.status(200).json({ message: "No data found", data: [] })
        }

        //if data found
        return res.status(200).json({ data: expenseData })
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Something wen't wrong", error: err.message })
    }
}

//single delete logic
export const deleteOne = async (req, res) => {
    const expenseId = req.params.id
    const deleteExpense = await expenseModel.deleteOne({
        _id: expenseId,
        userId: req.userId
    })

    if (!deleteExpense) {
        return res.status(400).json({ message: "something wen't wrong" })
    }
    return res.status(200).json({ message: "Deleted Successfully", data: deleteExpense })
}


//edit logic 
export const editExpense = async (req, res) => {

    const expenseId = req.params.id //extracting id from route
    const userId = req.userId //extracting from middleware 
    const { note, amount, date } = req.body
    const lowerNote = note.toLowerCase().trim()

    try {

        let category = detectCategory(note)

        if (!category) {
            const learned = await learnedCategoryModel.findOne({ keyword: lowerNote })
            if (learned) {
                category = learned.category
            } else {
                category = await detectCategoryWithAI(lowerNote)
                await learnedCategoryModel.create({ keyword: lowerNote, category: category })
            }
        }

        //updates expense in expensecollection
        const updatedExpense = await expenseModel.findOneAndUpdate(
            //filter
            {
                _id: expenseId,
                userId: userId
            },

            //update part
            {
                note: lowerNote,
                category, amount, date
            },
            //return updated record
            { new: true } //return doc
        )

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" })
        }

        return res.status(200).json({ message: "Expense has been updated successfully!" })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

//delete all
export const deleteAllExpense = async (req, res) => {
    try {
        const userId = req.userId
        const deleteResponse = await expenseModel.deleteMany({ userId })

        if (!deleteResponse) {
            console.log(deleteResponse);
            return res.status(404).json({ message: "No record found to be delete" })
        }
        console.log(deleteResponse);
        return res.status(200).json({ message: "All record successfully deleted", count: deleteResponse.deletedCount })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message })
    }
}