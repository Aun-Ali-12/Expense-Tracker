"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import Swal from "sweetalert2"

export default function useExpenseCard() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [expense, setExpense] = useState([])
    const [category, setCategory] = useState([])

    //get data handle
    const fetchExpense = async (from, to, selected) => {
        setLoading(true)
        setExpense([])
        setError("")

        const params = new URLSearchParams()

        if (from) params.append("from", from)
        if (to) params.append("to", to)
        if (selected && selected !== "all") params.append("category", selected)


        const endPoint = `/api/proxy/dashboard/expenses${params.toString() ? `?${params.toString()}` : ""}`

        try {
            const res = await fetch(endPoint, { credentials: "include" })

            const data = await res.json()
            if (!res.ok) {
                setError("No data found")
                setExpense([])
                return
            }
            setExpense(data.data)
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false)
        }
    }

    //delete handle
    const handleDel = async (id) => {
        setError("")
        setLoading(true)
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#5B4FCF',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            })

            if (result.isConfirmed) {
                await Delete(id)
                Swal.fire('Deleted!', 'The record has been removed.', 'success');
                toast.success('Item deleted successfully');
            }
        } catch (err) {
            Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
            toast.error('Delete failed');
        }
        finally {
            setLoading(false)
        }
    }

    // delete logic  
    async function Delete(id) {
        const endPoint = `/api/proxy/dashboard/expenses/${id}`
        const res = await fetch(endPoint, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include"
        })

        const data = await res.json()

        if (!res.ok) {
            setError("couldn't deleted, try again!")
            return;
        }
        setExpense((prev) => prev.filter((i) => (i._id !== id)))
    }
    //get data handle
    const fetchCategory = async () => {
        const endPoint = "/api/proxy/dashboard/expenses/cat"
        try {
            const res = await fetch(endPoint, {
                method: "GET",
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) {
                return
            }
            setCategory(data.data)
        }
        catch (err) {
            console.log(err.message);
        }
    }


    return { expense, setExpense, loading, error, fetchExpense, handleDel, category, fetchCategory }
}