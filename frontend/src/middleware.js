import { NextResponse } from "next/server";

const protectedRoute = ["/expense", "/budget", "/analytics"]

export function middleware(request) {
    // get token from cookies 
    const token = request.cookies.get("token")?.value
    //pathname extracting from req
    const { pathname } = request.nextUrl


    const isProtectedRoute = protectedRoute.some((route) => (
        pathname.startsWith(route)
    ))

    //if matches with protected route
    if (isProtectedRoute && !token) {
        const loginUrl = ("/login", request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/expense", "/budget", "/analytics"]
}