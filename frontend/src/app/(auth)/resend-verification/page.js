import ResendVerification from "@/component/Auth/ResendVerification"
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Resend Email Verification",
    noindex: true,
});

export default function ResendVerificationPage() {
    return (
        <><ResendVerification /></>
    )
}