export const getClientHeaders = (request) => {
    //client Ip from header
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || ""

    //return proxy secret and client Ip
    return {
        "x-proxy-secret": process.env.PROXY_SECRET,
        "x-client-ip": clientIp
    }

}