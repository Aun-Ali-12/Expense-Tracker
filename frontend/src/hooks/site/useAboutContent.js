export default function useAboutContent() {
    const intro = {
        title: "Built for people who hate budgeting apps",
        description:
            "We built ExTrack because every other expense tracker felt like homework. So we made one that's fast, visual, and actually enjoyable to open.",
    };

    const story = {
        title: "Why we started",
        paragraphs: [
            "It started as a weekend project to track one person's chai and grocery spending. Turns out everyone needed the same thing — something simple that didn't feel like an accounting tool.",
            "Today, ExTrack is used by students, freelancers, and small teams who just want to know where their money is going, without the spreadsheet spiral.",
        ],
    };

    const values = [
        {
            icon: "Zap",
            title: "Speed first",
            description: "Add an expense in under 5 seconds. That's the whole point.",
        },
        {
            icon: "Eye",
            title: "Total clarity",
            description: "No hidden fees, no confusing charts. Just numbers you understand instantly.",
        },
        {
            icon: "ShieldCheck",
            title: "Privacy respected",
            description: "Your financial data stays yours. Always.",
        },
    ];

    const team = [
        { name: "Aun Ali", role: "Founder & Developer", initials: "AA" },
    ];

    return { intro, story, values, team };
}