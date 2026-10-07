import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function useResetPassword() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [password, setPassword] = useState(null)
    const [reEnter, setReEnter] = useState(null)
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [show, setShow] = useState(false)
    const [showReEnter, setShowReEnter] = useState(false);
    //password validator:

    const passwordChecks = useMemo(() => (
        {
            hasMinLength: password?.length >= 8,
            hasUpperCase: /[A-Z]/.test(password ?? ""),
            hasLowerCase: /[a-z]/.test(password ?? ""),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }
    ), [password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");

        if (!password || !reEnter) {
            setError("Please fill in both fields.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== reEnter) {
            setError("Passwords do not match.");
            return;
        }

        const endPoint = "/auth/reset-password"

        setLoading(true)
        setError("")
        setMessage("")
        if (!token) {
            setError("Your link to change your password is expired, try again!")
            setLoading(false)
            return
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ password, token })
            })

            const data = await res.json()

            if (!res.ok) {
                setMessage(data.message)
                return
            }
            setMessage(data.message)
        } catch (err) {
            setError("Something wen't wrong, try again!")
        }
        finally {
            setLoading(false)
        }
    }

    return { password, setPassword, reEnter, setReEnter, loading, message, error, passwordChecks, show, setShow, showReEnter, setShowReEnter, handleSubmit }
}