import mongoose from "mongoose";
import expenseModel from "../../models/Expense.js"
import learnedCategoryModel from "../../models/LearnedCategory.js"
import detectCategory from "../../utility/categoryMap.js";
import { detectCategoryWithAI } from "../../utility/gemini.js";


export const addExpenseController = async (req, res) => {
    const { note, amount, date } = req.body
    const userId = req.userId
    const lowerNote = note.trim()
    try {
        //detect category function
        let category = detectCategory(lowerNote)

        //if category is null, find first in db then api call
        if (!category) {

            const learned = await learnedCategoryModel.findOne({ keyword: lowerNote })
            console.log("learned", learned);

            //if already in db, reassign to category variable
            if (learned) {
                category = learned.category
            } else {
                //otherwise hit api
                category = await detectCategoryWithAI(lowerNote)
                console.log("category:", category);

                //then add category in db
                await learnedCategoryModel.create({
                    keyword: lowerNote,
                    category: category
                })
            }
        }
        console.log("category:", category);

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
        console.log(err.message);
        return res.status(400).json({ message: "Something wen't wrong, try again!" })
    }
}

export const getData = async (req, res) => {
    //fetch user's data
    const expenseData = await expenseModel.find({ userId: req.userId })

    //check if data is empty
    if (expenseData.length === 0) {
        return res.status(200).json({ message: "No data found", data: [] })
    }

    //if data found
    return res.status(200).json({ data: expenseData })
}

export const deleteOne = async (req, res) => {
    const expenseId = req.params.id
    const deleteExpense = await expenseModel.deleteOne({
        _id: expenseId,
        userId: req.userId
    })

    if (!deleteExpense) {
        console.log("nahi hua delete");
        return res.status(400).json({ message: "something wen't wrong" })
    }
    console.log(deleteExpense);
    return res.status(200).json({ message: "Deleted Successfully", data: deleteExpense })
} 