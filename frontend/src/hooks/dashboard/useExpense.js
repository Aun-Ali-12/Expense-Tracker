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
    //loading
    const [loading, setLoading] = useState(false)

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
            userId: data?.userId,
            note: data?.note.toLowerCase().trim(),
            amount: data?.amount,
            date: data?.date?.split("T")[0] //splits date and select 1st index
        })
    }

    const addExpense = async () => {
        setMessage("")
        const endPoint = "/api/proxy/dashboard/expenses"
        setLoading(true)
        try {
            const res = await fetch(`${endPoint}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                setMessage(data.message)
                return
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
            setLoading(false)
        }
    }

    const updateExpense = async (id) => {
        setMessage("")
        setLoading(true)
        try {
            const endPoint = `/api/proxy/dashboard/expenses/${id}`

            const res = await fetch(endPoint, {
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
            await fetchExpense()
            setMessage(data.message)
            toast.success("Expense successfully updated!")
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            resetEdit()
            setIsOpen(false)
            setLoading(false)
        }
    }
    return { formData, handleChange, handleSubmit, loading, handleEdit, edit, isEdit, isOpen, setIsOpen, message, setMessage, resetEdit, resetAdd }
}