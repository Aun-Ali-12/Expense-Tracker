import { useExpense } from "@/Context/ExpenseData"
import { useState } from "react"
import toast from "react-hot-toast"

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
    //used to handle form toggling
    const [isOpen, setIsOpen] = useState(false);
    //expense context
    const { expense, fetchExpense, setExpense } = useExpense()
    //message
    const [message, setMessage] = useState("")

    //resets add states
    const resetAdd = () => {
        setFormData({
            note: "",
            amount: "",
            date: ""
        })
    }
    //resets edit states
    const resetEdit = () => {
        setIsEdit(false)
        setEditId(null)
        setEdit(null)
    }

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
        setMessage("")
        const endPoint = "/dashboard/expenses"

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            console.log(data);

            if (!res.ok) {
                console.log(data.message);
                setMessage(data.message)
                return res.status(400).json({ message: "something went wrong" })
            }
            setExpense((prev) => [data.data, ...prev])
            setMessage(data.message)
            toast.success("Expense successfully added!")
        }
        catch (err) {
            console.log(err.message);
        }

        finally {
            setFormData({
                note: "",
                amount: "",
                date: ""
            })
            setIsOpen(false)
        }
    }

    const updateExpense = async (id) => {
        setMessage("")
        try {
            const endPoint = `/dashboard/expenses/${id}`

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(edit)
            })

            const data = await res.json()

            if (!res.ok) {
                setMessage(data.message)
                return
            }
            fetchExpense()
            setMessage(data.message)
            toast.success("Expense successfully updated!")
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            resetEdit()
            setIsOpen(false)
        }
    }
    return { formData, handleChange, handleSubmit, handleEdit, edit, isEdit, isOpen, setIsOpen, message, setMessage, resetEdit, resetAdd }
}