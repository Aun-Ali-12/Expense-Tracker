import { useMemo } from "react";

const POLICY = {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your information.",
    lastUpdated: "2026-10-02",
    intro:
        "This policy explains what information we collect when you use our budget tracker, why we collect it, and the choices you have. We only collect what we need to run the app.",
    contactEmail: "extrack@gmail.com",
    sections: [
        {
            id: "information-we-collect",
            title: "Information we collect",
            paragraphs: ["We collect the following information when you use the app:"],
            items: [
                "Account details: your name, email address, and an encrypted password.",
                "Budget and expense data: monthly budgets, amounts, categories, and notes you add.",
                "Usage data: basic device, browser, and log information that helps us fix errors.",
            ],
        },
        {
            id: "how-we-use-it",
            title: "How we use your information",
            paragraphs: ["We use your information to:"],
            items: [
                "Create and manage your account.",
                "Show your budget history, spending, and balance.",
                "Keep the app secure and prevent misuse.",
                "Improve features and fix bugs.",
                "Contact you about important account or service changes.",
            ],
        },
        {
            id: "data-sharing",
            title: "Sharing your information",
            paragraphs: [
                "We do not sell your personal data. We share information only with service providers that help us run the app, such as hosting and email delivery, and only when the law requires it.",
            ],
        },
        {
            id: "data-storage",
            title: "Storage and security",
            paragraphs: [
                "Your data is stored on secure servers and sent over encrypted connections. Passwords are hashed, so we cannot read them. No system is completely secure, so please use a strong, unique password.",
            ],
        },
        {
            id: "data-retention",
            title: "How long we keep your data",
            paragraphs: [
                "We keep your data while your account is active. If you delete your account, we remove your personal data within 30 days, except where we must keep it for legal reasons.",
            ],
        },
        {
            id: "your-rights",
            title: "Your choices",
            paragraphs: ["You can:"],
            items: [
                "View and edit your account and budget data in the app.",
                "Request a copy of your data.",
                "Ask us to delete your account and data.",
            ],
        },
        {
            id: "children",
            title: "Children's privacy",
            paragraphs: [
                "The app is not meant for children under 13, and we do not knowingly collect their data. If you think a child has given us information, contact us and we will delete it.",
            ],
        },
        {
            id: "changes",
            title: "Changes to this policy",
            paragraphs: [
                "If we change this policy, we will update the date at the top of this page. For major changes, we will also notify you in the app or by email.",
            ],
        },
    ],
};

export default function usePrivacyPolicy() {
    const policy = useMemo(() => POLICY, []);
    return { policy, loading: false, error: null };
}