export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard", "/expenses", "/budget", "/analytics"],
        },
        sitemap: "https://extrack-delta.vercel.app/sitemap.xml",
    };
}