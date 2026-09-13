import userModel from "../../models/User.js"

export const getUser = async (req, res) => {
    const _id = req.userId
    try {
        const user = await userModel.findById({ _id })
        if (!user) {
            return res.status(404).json({ message: "user not found!", data: user })
        }
        return res.status(200).json({
            message: "User found!", data: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            }
        })
    } catch (err) {
        return res.status(500).json({ message: "something wen't wrong", data: err.message })
    }
}

