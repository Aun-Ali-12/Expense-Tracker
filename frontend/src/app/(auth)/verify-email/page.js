import VerifyEmailPage from "@/component/Auth/VerifyEmail"
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Verify Your ExTrack Email",
    description: "Verify your ExTrack account email.",
    noindex: true,
});

export default function VerifyEmail() {
    return (<><VerifyEmailPage /></>)
}