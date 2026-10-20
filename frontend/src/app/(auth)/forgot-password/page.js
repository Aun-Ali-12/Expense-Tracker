import ForgotPassword from "@/component/Auth/ForgotPassword"

export const metadata = {
    title: "Forgot Password",
    description: "Reset your ExTrack account password.",
    robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
    return (
        <>
            <ForgotPassword />
        </>
    )
}