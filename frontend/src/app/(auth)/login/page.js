import AuthForm from "@/component/Auth/AuthForm"
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Login",
    description: "Log in to your ExTrack account to view your expenses, budgets and spending history.",
    path: "/login",
});

// login page 
export default function LoginPage() {
    return (
        <>
            <AuthForm mode="login" />
        </>
    )
}