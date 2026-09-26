import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const endPoint = `/dashboard/expenses/all${params.toString() ? `?${params.toString()}` : ""}`

    const params = new URLSearchParams()

    if (from) params.append("from", from)
    if (to) params.append("to", to)

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await backendRes.json();

    return NextResponse.json(data, { status: backendRes.status });
}