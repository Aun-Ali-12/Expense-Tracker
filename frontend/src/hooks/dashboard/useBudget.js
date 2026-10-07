import { useState } from "react";
import toast from "react-hot-toast";

export default function useBudget() {
    const [budget, setBudget] = useState(0) //handle budget of user
    const [loading, setLoading] = useState(false)
    const month = new Date().toISOString().slice(0, 7) //this gives yyy-mm

    //set budget
    const setBudgetHandler = async (amount) => {
        const endPoint = "/api/proxy/budget"
        try {
            const res = await fetch(endPoint, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ month, amount })
            })

            const data = await res.json()

            if (!res.ok) {
                return
            }
            toast.success("Budget has been successfully set!")
            await fetchBudgetHandler()
        }
        catch (err) {
            console.log(err.message);
        }
    }

    //fetch budget
    const fetchBudgetHandler = async () => {
        setLoading(true)
        const endPoint = "/api/proxy/getbudget"
        try {
            const res = await fetch(endPoint, {
                method: "GET",
                credentials: "include",
            })

            const data = await res.json()

            if (!res.ok) {
                return
            }
            setBudget(data.data)
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setLoading(false)
        }
    }
    return { setBudgetHandler, fetchBudgetHandler, budget, loading }
}