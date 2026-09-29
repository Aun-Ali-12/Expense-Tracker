import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function handler(request, { params }) {
    const { path } = await params //path:[api, anyendpoint ]
    const fullPath = "/" + path.join("/") // /api/anyendpoint

    //query 
    const queryString = request.nextUrl.searchParams.toString()
    //final path, if query and if no query
    const finalPath = queryString ? `${fullPath}?${queryString}` : fullPath


    //initiate cookies
    const cookiesStore = await cookies();
    //get cookies value
    const token = cookiesStore.get("token")?.value

    //if no cookies
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    //body data on basis of method
    const body = request.method !== "GET" ? await request.text() : undefined

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${finalPath}`, {
        method: request.method,
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...getClientHeaders(request),
        },
        body: body,
        cache: "no-store"
    })

    const data = await res.json()
    if (!res.ok) {
        return NextResponse.json(data, { status: data.status })
    }
    return NextResponse.json({ data: data.data }, { status: data.status })
}
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };