"use client"
import { useState } from "react"

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
        console.log(id);
        const endPoint = `/dashboard/expenses/${id}`
        setError("")
        setLoading(true)
        try {
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


    return { expense, setExpense, loading, error, fetchExpense, handleDel }
}