export default function useContactContent() {
    const header = {
        title: "Let's talk",
        subtitle: "Questions, feedback, or partnership ideas — we'd love to hear from you.",
    };

    const contactInfo = [
        { icon: "Mail", label: "Email", value: "hello@extrack.app" },
        { icon: "MapPin", label: "Based in", value: "Karachi, Pakistan" },
        { icon: "Clock", label: "Response time", value: "Within 24 hours" },
    ];

    const formFields = [
        { name: "name", label: "Full name", type: "text", placeholder: "John Doe" },
        { name: "email", label: "Email", type: "email", placeholder: "name@example.com" },
        { name: "message", label: "Message", type: "textarea", placeholder: "Tell us what's on your mind..." },
    ];

    return { header, contactInfo, formFields };
}