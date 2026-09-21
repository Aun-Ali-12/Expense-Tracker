import crypto from "crypto"
export const generateToken = async () => {
    return crypto.randomBytes(32).toString("hex")
}