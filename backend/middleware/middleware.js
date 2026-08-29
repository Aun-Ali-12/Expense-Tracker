import jwt from "jsonwebtoken"

export const middleware = (req, res, next) => {
    //extracts out token from header
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "Token not provided" })
        }

        //if token is available:
        const token = authHeader.split(" ")[1]

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.userId

        next()
    }
    catch (err) {
        return res.status(401).json({ message: "Something wen't wrong!" })
    }
}