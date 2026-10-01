import { ipKeyGenerator } from "express-rate-limit";

export const getClientIp = (req) => {
    const secret = req.headers["x-proxy-secret"];
    const clientIp = req.headers["x-client-ip"];
    const secretOk = !!secret && secret === process.env.PROXY_SECRET
    console.log("req.ip:", req.ip, "| x-client-ip:", clientIp, "| secretOk:", secretOk);

    //if secret matches, only then accept forwarded ip
    if (secretOk && clientIp) return clientIp
    return req.ip
}

export const makeKey = (req) => ipKeyGenerator(getClientIp(req));