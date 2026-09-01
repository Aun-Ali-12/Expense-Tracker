import { useState } from "react"

export default function useExpenseHook() {
    //handles add expense data 
    const [formData, setFormData] = useState({
        note: "",
        amount: "",
        date: ""
    })

    //edit Id:
    const [editId, setEditId] = useState(null)
    //handle edit expense details
    const [edit, setEdit] = useState(null)
    //edit toggle
    const [isEdit, setIsEdit] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        if (isEdit) {
            setEdit((prev) => (
                { ...prev, [name]: value }
            ))
        } else {
            setFormData((prev) => (
                { ...prev, [name]: value }
            ))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isEdit) {
            await updateExpense(editId)
        } else {
            await addExpense()
        }
    }

    const handleEdit = (data, id) => {
        setIsEdit(true)
        setEditId(id)
        setEdit({
            userId: data.userId,
            note: data.note.toLowerCase().trim(),
            amount: data.amount,
            date: data.date.split("T")[0] //splits date and select 1st index
        })
        console.log(id);
        console.log(edit);
    }

    const addExpense = async () => {
        const endPoint = "/dashboard/expenses"
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            console.log(data);

            if (!res.ok) {
                console.log(data.message);
                return res.status(400).json({ message: "something went wrong" })
            }
            console.log("added success", data);
        } catch (err) {
            console.log("Something went wrong");
        }

        if (isEdit) {
            try {
                const endPoint = `/dashboard/expense/${edit._id}`
                console.log(endPoint);
            }
            catch (err) {
                console.log("something wen't wrong while updating expense in collection");

            }
        }
    }

    const updateExpense = async (id) => {
        const token = localStorage.getItem("token")
        try {
            const endPoint = `/dashboard/expenses/${id}`

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(edit)
            })

            const data = await res.json()

            if (!res.ok) {
                console.log(data.message);
                return
            }
            console.log(data.message);
            console.log(data);
        }
        catch (err) {
            console.log("err in update handler");
        }
    }

    return { formData, handleChange, handleSubmit, handleEdit, edit, isEdit }
}