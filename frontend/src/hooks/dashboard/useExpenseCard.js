"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import Swal from "sweetalert2"

export default function useExpenseCard() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [expense, setExpense] = useState([])


    //get data handle
    const fetchExpense = async (from, to) => {
        setLoading(true)

        const params = new URLSearchParams()

        if (from) params.append("from", from)
        if (to) params.append("to", to)

        const endPoint = `/dashboard/expenses/all${params.toString() ? `?${params.toString()}` : ""}`
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "GET",
                credentials: "include"
            })

            const data = await res.json()
            if (!res.ok) {
                setError("No data found")
                console.log(data.message);
                return
            }
            console.log(data.data);
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
            console.log("Something went wrong", err.message);
        }
        finally {
            setLoading(false)
        }
    }

    // delete logic  
    async function Delete(id) {
        const endPoint = `/dashboard/expenses/${id}`
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include"
        })

        const data = await res.json()

        if (!res.ok) {
            console.log("couldn't deleted, try again!");
            setError("couldn't deleted, try again!")
            return;
        }
        setExpense((prev) => prev.filter((i) => (i._id !== id)))
    }

    return { expense, setExpense, loading, error, fetchExpense, handleDel }
}