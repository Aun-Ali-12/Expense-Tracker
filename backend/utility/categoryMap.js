const categoryKeywords = {
    Breakfast: ["anda", "andy", "paratha", "doodh", "milk", "cereal", "toast", "omelette"],
    Grocery: ["chawal", "aata", "sabzi", "daal", "chini", "ghee", "grocery", "vegetables"],
    Transport: ["uber", "careem", "petrol", "diesel", "fuel", "rickshaw", "bus fare"],
    Bills: ["electricity", "bijli", "gas bill", "internet", "wifi", "phone bill"],
    Food: ["lunch", "dinner", "restaurant", "biryani", "burger", "pizza", "karahi"],
    Entertainment: ["netflix", "movie", "cinema", "game", "spotify"],
    Shopping: ["clothes", "shoes", "shirt", "shopping"],
};

export default function detectCategory(lowerNote) {

    //loop to find matched category
    try {
        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            const found = keywords.some((keyword) => lowerNote.includes(keyword));
            if (found) {
                return category
            }
            return null
        }
    }
    catch (error) {
        console.log("error in detectCategory", error.message);
    }
}