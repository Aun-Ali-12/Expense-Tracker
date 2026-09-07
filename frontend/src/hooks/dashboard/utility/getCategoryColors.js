export function useCategoryColors() {

    const colors = [
        "bg-sky-50 text-sky-600",
        "bg-emerald-50 text-emerald-600",
        "bg-amber-50 text-amber-600",
        "bg-rose-50 text-rose-600",
        "bg-violet-50 text-violet-600",
        "bg-teal-50 text-teal-600",
    ]
    const getCategoryColor = (category) => {

        //stores char code
        let total = 0

        //loop to get code of every char 
        for (let i = 0; i < category.length; i++) {
            total = total + category.charCodeAt(i)
        }

        let index = total % colors.length;

        return colors[index]
    }

    return { getCategoryColor }
}