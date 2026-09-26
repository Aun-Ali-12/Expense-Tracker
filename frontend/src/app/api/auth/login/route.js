import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const endPoint = "/auth/login"

    //nodejs backend login api 
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
        return NextResponse.json(data, { status: backendRes.status });
    }

    const response = NextResponse.json({ success: true, user: data.user });

    response.cookies.set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60, // 1 din
    });

    return response;
}