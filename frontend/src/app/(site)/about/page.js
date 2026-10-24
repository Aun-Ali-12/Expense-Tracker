import About from "@/component/site/about/About"
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "About Us",
    description:
        "Learn about ExTrack, an expense tracker built to help you track spending, set budgets and understand where your money goes, without the spreadsheet headache.",
    path: "/about",
});

export default function AboutPage() {
    return (
        <><About /></>
    )
}