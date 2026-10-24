import VerifyEmailPage from "@/component/Auth/VerifyEmail"

export const metadata = buildMetadata({
    title: "Verify Your ExTrack Email",
    description: "Verify your ExTrack account email.",
    noindex: true,
});

export default function VerifyEmail() {
    return (<><VerifyEmailPage /></>)
}