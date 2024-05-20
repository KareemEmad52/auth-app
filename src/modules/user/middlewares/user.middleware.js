import { AppError, CatchAsyncError } from "../../../utils/error.handles.js"
import { userModel } from "../model/user.model.js"


export const uniqueEmail = CatchAsyncError(async (req, res, next) => {
    const { email } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
        throw new AppError("Email already exists", 400)
    } else {
        next()
    }
})