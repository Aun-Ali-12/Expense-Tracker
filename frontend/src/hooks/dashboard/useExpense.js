import { useState } from "react"

export default function useExpense() {
    //handles add expense data 
    const [expense, setExpense] = useState({
        note: "",
        amount: "",
        date: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setExpense((prev) => (
            { ...prev, [name]: value }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const endPoint = "/dashboard/expenses"
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(expense)
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
    }

    return { expense, handleChange, handleSubmit }
}