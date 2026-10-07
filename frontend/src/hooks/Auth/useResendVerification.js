import { useState } from "react";

export default function useResendVerification() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const resendVerification = async () => {
        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        setLoading(true);
        try {
            const endPoint = "/auth/resend-verification"
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong.");
                return;
            }
            setMessage(data.message);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        loading,
        message,
        error,
        resendVerification,
    };
}