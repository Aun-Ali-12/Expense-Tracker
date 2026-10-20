export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard", "/expenses", "/budget", "/analytics", "verify-email", "forgot-password", "reset-password", "resend-verification"],
        },
        sitemap: "https://extrack-delta.vercel.app/sitemap.xml",
    };
}