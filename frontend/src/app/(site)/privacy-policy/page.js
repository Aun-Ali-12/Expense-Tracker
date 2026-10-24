import PrivacyPolicy from "@/component/site/privacyandpolicy/PrivacyPolicy"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
    title: "Privacy Policy",
    description:
        "Read how ExTrack collects, uses and protects your personal information and expense data.",
    path: "/privacy-policy",
});

export default function ContactPage() {
    return (
        <><PrivacyPolicy /></>
    )
}