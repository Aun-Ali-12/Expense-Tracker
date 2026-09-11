"use client";
import { useEffect, useState } from "react";

export default function useCountUp(value) {
    const strValue = String(value);

    // Number ka sahi hissa nikalo (commas ke sath), jese "8,500" ya "1.2" ya "12"
    const match = strValue.match(/[\d,]+\.?\d*/);
    const numStr = match ? match[0] : "0";
    const hasCommas = numStr.includes(",");
    const target = parseFloat(numStr.replace(/,/g, "")) || 0;
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    const [count, setCount] = useState(0);

    useEffect(() => {
        const step = target / 50; // 50 steps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, 20);

        return () => clearInterval(timer);
    }, [target]);

    // Number ko format karo (commas wapis lagao agar original mein thay)
    let formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();
    if (hasCommas) {
        formatted = Number(formatted).toLocaleString();
    }

    // Original string mein sirf number wala hissa replace karo, prefix/suffix waisa hi rahe
    return strValue.replace(/[\d,]+\.?\d*/, formatted);
}