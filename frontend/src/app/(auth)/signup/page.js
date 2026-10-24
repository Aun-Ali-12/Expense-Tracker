import AuthForm from "@/component/Auth/AuthForm"
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Sign Up",
    description: "Create a free ExTrack account and start tracking your daily expenses and budgets with AI.",
    path: "/signup",
});

//signup page
export default function SignupPage() {
    return (
        <>
            <AuthForm mode="signup" />
        </>
    )
}