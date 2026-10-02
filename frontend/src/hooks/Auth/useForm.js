import { useExpense } from "@/Context/ExpenseData"
import { useUser } from "@/Context/User"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function useForm(mode) {
    const { getUser } = useUser()
    const { fetchBudgetHandler, fetchExpense } = useExpense()
    const router = useRouter() //for navigation

    //manages form data 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false) //handles loading state in form
    const [error, setError] = useState("") //handles form error
    const [succes, setSuccess] = useState("")
    const successMessage = mode === "signup" ? "signup successfull" : "login successfull"
    const validateFields = mode === "signup" ? !formData.name || !formData.email || !formData.password : !formData.email || !formData.password

    //password validator:
    const passwordChecks = {
        hasMinLength: formData.password.length >= 8,
        hasUpperCase: /[A-Z]/.test(formData.password ?? ""),
        hasLowerCase: /[a-z]/.test(formData.password) ?? "",
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    }

    //handle change
    const handleChange = (e) => {

        //get value from input
        const { name, value } = e.target

        //set value in formData state
        setFormData((prev) => (
            { ...prev, [name]: value }
        ))
    }

    const handleSubmit = async (e) => {

        //prevents form to auto load
        e.preventDefault()
        if (validateFields) {
            setError("fill out all the fields")
            return
        }
        if (formData.password.length < 8) {
            setError("password should be of 8 characters")
            return
        }
        //route based on mode
        const endPoint = mode === "signup" ? `${process.env.NEXT_PUBLIC_API_URL}/auth/signup` : "/api/auth/login"

        //user req
        const body = mode === "signup" ? {
            name: formData.name.trim().replace(/\s+/g, " "),
            email: formData.email.trim().toLowerCase().replace(/\s+/g, " "),
            password: formData.password.trim()
        } : { email: formData.email.trim().replace(/\s+/g, " "), password: formData.password.trim() }
        setLoading(true)
        setError("")
        setSuccess("")
        console.log(body);
        try {
            //fetch api:
            const res = await fetch(`${endPoint}`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                ...(mode === "login" && { credentials: "include", }), //spread trick
                body: JSON.stringify(body)
            })


            //convert res into json
            const data = await res.json()
            console.log(data.message);

            if (!res.ok) {
                console.log(data.message);
                setError(data.message)
                setLoading(false)
                return;
            }
            setSuccess(data.message)

            //navigating user on base of mode
            if (mode === "login") {
                router.push("/expense")
                await fetchExpense()
                await fetchBudgetHandler()
                await getUser()
            }
        }
        catch (error) {
            console.log(error.message);
            setError("Server error, please try again!", error)
        }
        finally {
            setLoading(false)
        }
    }

    return { formData, handleChange, handleSubmit, loading, error, succes, passwordChecks }
}