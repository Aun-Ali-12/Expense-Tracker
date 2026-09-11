export default function useServicesContent() {
    const header = {
        title: "Everything you need to manage your money",
        subtitle: "One tool, every feature you actually use — nothing you don't.",
    };

    const services = [
        {
            icon: "Wallet",
            title: "Budget management",
            description: "Set a monthly budget once, and watch your remaining balance update in real time as you spend.",
        },
        {
            icon: "Receipt",
            title: "Expense tracking",
            description: "Log expenses in seconds with note, amount, category, and date — searchable and filterable anytime.",
        },
        {
            icon: "PieChart",
            title: "Category analytics",
            description: "Visual breakdowns of where your money goes each month, category by category.",
        },
        {
            icon: "TrendingUp",
            title: "Spending trends",
            description: "Compare this month against last month and spot patterns before they become problems.",
        },
        {
            icon: "CalendarRange",
            title: "Custom date filters",
            description: "Filter your history by any date range — last week, last quarter, or a custom range.",
        },
        {
            icon: "Bell",
            title: "Budget alerts",
            description: "Get a heads up when you're approaching your monthly limit, not after you've blown past it.",
        },
    ];

    return { header, services };
}