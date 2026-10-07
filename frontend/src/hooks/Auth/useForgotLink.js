import { useState } from "react";

export default function useforgotPassword() {
    const [email, setEmail] = useState();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    //change password link
    const sendPasswordLink = async () => {
        setMessage("")
        setIsError(false)
        setLoading(true)
        const endPoint = "/auth/forgot-password"; //api endpoint
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) {
                setIsError(true)
                setMessage(data.message)
                return;
            }
            setMessage(data.message)
        }
        catch (err) {
            setIsError(true)
        }
        finally {
            setLoading(false)
        }
    };
    return { email, setEmail, message, loading, isError, setMessage, sendPasswordLink }
}