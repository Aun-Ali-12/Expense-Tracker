import Contact from "@/component/site/contact/Contact"
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
    title: "Contact Us",
    description:
        "Have a question or feedback about ExTrack? Get in touch with us and we will get back to you as soon as possible.",
    path: "/contact",
});

export default function ContactPage() {
    return (
        <><Contact /></>
    )
}