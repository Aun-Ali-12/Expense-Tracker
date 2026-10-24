import ResetPassword from "@/component/Auth/ResetPassword"

export const metadata = buildMetadata({
    title: "Reset Password",
    description: "If you forgot your Extrack password, you can reset your password from this page.",
    noindex: true,
});

export default function ForgotPasswordPage() {
    return (
        <><ResetPassword /></>
    )
}