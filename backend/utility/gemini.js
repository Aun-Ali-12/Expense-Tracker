export async function detectCategoryWithAI(note) {
    try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: [{
                        role: "user",
                        content: `Categorize this expense item into ONE word category (like Breakfast, Grocery, Transport, Bills, Food, Entertainment, Shopping, or Other). Item: "${note}". Reply with ONLY the category word, nothing else.`
                    }]
                })
            }
        )

        const data = await res.json()
        console.log("response", data);
        const category = data?.choices?.[0]?.message?.content?.trim()
        console.log("category hai", category);
        return category || "Uncategorized"

    }
    catch (error) {
        console.log("Gemini api error", error.message);
        return "Uncategorized"
    }
}