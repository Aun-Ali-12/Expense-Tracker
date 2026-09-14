import { useState } from "react";

export default function useBudget() {
    const [budget, setBudget] = useState(0) //handle budget of user
    const [amount, setAmount] = useState(0) //handles amount getting from user input
    const [isOpen, setIsOpen] = useState(false) //toggles the state of set budget button
    const [loading, setLoading] = useState(false)
    const month = new Date().toISOString().slice(0, 7) //this gives yyy-mm

    //set budget
    const setBudgetHandler = async () => {
        const endPoint = "/budget"
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
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
        setLoading(true)
        const endPoint = "/getbudget"
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "GET",
                credentials: "include",
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
        finally {
            setLoading(false)
        }
    }
    return { amount, setAmount, setBudgetHandler, fetchBudgetHandler, isOpen, setIsOpen, budget, loading }
}