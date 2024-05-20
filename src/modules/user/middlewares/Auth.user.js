import jwt from "jsonwebtoken"
import { AppError, CatchAsyncError } from "../../../utils/error.handles"
import { userModel } from "../model/user.model"



export const Authenticate = CatchAsyncError(async (req, res, next) => {
    const token = req.header('token')

    if (!token) throw new AppError("Unauthentcated", 400)


    jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
        try {
            const { _id } = data
            const user = await userModel.findOne({ _id })
            req.user = user
            next()
        } catch (error) {
            res.status(498).json("invalid Token")
        }
    })
})

