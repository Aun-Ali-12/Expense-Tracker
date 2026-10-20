import ResendVerification from "@/component/Auth/ResendVerification"

export const metadata = {
    title: "Resend Email Verification",
    description: "Verify your ExTrack account email.",
    robots: { index: false, follow: false },
};

export default function ResendVerificationPage() {
    return (
        <><ResendVerification /></>
    )
}