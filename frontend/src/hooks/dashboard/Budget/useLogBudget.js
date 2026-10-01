import { useState, useCallback } from "react";

export function useLogBudget() {
    const [msg, setMsg] = useState("");
    const [allBudget, setAllBudget] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllBudget = useCallback(async () => {
        setLoading(true);
        const endPoint = "/api/proxy/budget/all"
        try {
            const res = await fetch(endPoint, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setMsg(
                    res.status === 429
                        ? "Too many requests, please wait a minute."
                        : data?.message || "Something went wrong"
                );
                return;
            }

            setAllBudget(Array.isArray(data?.data) ? data.data : []);
            setMsg("");
        } catch (err) {
            console.error("fetchAllBudget error:", err);
            setMsg("Network error, please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    return { fetchAllBudget, allBudget, msg, loading };
}