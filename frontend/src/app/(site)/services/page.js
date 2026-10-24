import Services from "@/component/site/services/Services.jsx"
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Expense Tracking Features & Services",
    description:
        "Explore what ExTrack offers: expense tracking, budget management, spending history and AI features that make daily money tracking simple.",
    path: "/services",
});

export default function AboutPage() {
    return (
        <><Services /></>
    )
}