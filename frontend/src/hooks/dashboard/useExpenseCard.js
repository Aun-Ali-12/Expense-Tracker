"use client"
import { useState } from "react"

export default function useExpenseCard() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [expense, setExpense] = useState([])


    //get data handle
    const fetchExpense = async () => {
        setLoading(true)
        const endPoint = "/dashboard/expenses/all"
        const token = localStorage.getItem("token")

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            const data = await res.json()
            if (!res.ok) {
                setError("No data found")
                console.log(data.message);
                return
            }
            console.log(data);
            setExpense(data.data)
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    }


    //delete handle
    const handleDel = async (id) => {
        const token = localStorage.getItem("token")
        console.log(id);
        const endPoint = `/dashboard/expenses/${id}`
        setError("")
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            const data = await res.json()

            if (!res.ok) {
                console.log("couldn't deleted, try again!");
                setError("couldn't deleted, try again!")
                return;
            }

            alert("deleted")
            setExpense((prev) => prev.filter((i) => (i._id !== id)))
        }
        catch (err) {
            console.log("Something went wrong", err.message);
        }
        finally {
            setLoading(false)
        }
    }


    return { expense, fetchExpense, handleDel }
}