import jwt from "jsonwebtoken"

export const middleware = (req, res, next) => {
    const token = req.cookies.token

    //if token is not available
    if (!token) {
        return res.status(401).json({ message: "No token, unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}