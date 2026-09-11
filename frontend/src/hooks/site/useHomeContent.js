export default function useHomeContent() {
    const hero = {
        badge: "Now tracking smarter with AI",
        title: "Take control of your money, one expense at a time",
        subtitle:
            `ExTrack helps you track spending, set budgets, and understand where your money goes — without the spreadsheet headache.`,
        ctaPrimary: { label: "Get started free", link: "/signup" },
        ctaSecondary: { label: "See how it works", link: "/services" },
    };

    const stats = [
        { label: "Active users", value: "12K+" },
        { label: "Expenses tracked", value: "1.2M+" },
        { label: "Avg. monthly savings", value: "Rs. 8,500" },
    ];

    const features = [
        {
            icon: "LayoutDashboard",
            title: "Clean dashboard",
            description: "See your budget, spending, and balance at a glance — no clutter, just clarity.",
        },
        {
            icon: "BarChart3",
            title: "Smart analytics",
            description: "Category breakdowns and trends that actually help you make better decisions.",
        },
        {
            icon: "Wallet",
            title: "Budget tracking",
            description: "Set monthly budgets and get warned before you overspend, not after.",
        },
        {
            icon: "Sparkles",
            title: "AI categorization",
            description: "Just add a note — we auto-detect the category so you don't have to.",
        },
    ];

    return { hero, stats, features };
}