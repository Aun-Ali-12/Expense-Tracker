import { useState } from "react";

export default function useBudget() {
    const [budget, setBudget] = useState(0) //handle budget of user
    const [amount, setAmount] = useState(0) //handles amount getting from user input
    const [isOpen, setIsOpen] = useState(false) //toggles the state of set budget button
    const month = new Date().toISOString().slice(0, 7) //this gives yyy-mm

    //set budget
    const setBudgetHandler = async () => {
        const token = localStorage.getItem("token")
        const endPoint = "/budget"
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ month, amount })
            })

            const data = await res.json()

            if (!res.ok) {
                console.log(data.message);
                return
            }
            alert("Budget is set! you can update it anytime.")
            await fetchBudgetHandler()
        }
        catch (err) {
            return res.status(500).json({ message: "something went wrong" })
        }
        finally {
            setIsOpen(false)
            setAmount(0)
        }
    }

    //fetch budget
    const fetchBudgetHandler = async () => {
        const token = localStorage.getItem("token")
        const endPoint = "/getbudget"
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await res.json()

            if (!res.ok) {
                console.log(data.message);
                return
            }
            console.log(data);
            setBudget(data.data)
        }
        catch (err) {
            console.log(err.message);
        }
    }
    return { amount, setAmount, setBudgetHandler, fetchBudgetHandler, isOpen, setIsOpen, budget }
}