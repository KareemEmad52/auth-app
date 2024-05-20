import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AppError, CatchAsyncError } from "../../../utils/error.handles.js";
import { userModel } from "../model/user.model.js";

export const addUser = CatchAsyncError(async (req,res) => {
    
    const {name , email ,password ,phone ,age} = req.body

    const hashedPassword = bcrypt.hashSync(password, 5)

    const user = await userModel.create({name , email ,password: hashedPassword ,phone ,age})


    res.status(201).json({ message: "User Created Successfully " })
})



export const login = CatchAsyncError(async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })


    if (!user || !bcrypt.compareSync(password, user.password)) throw new AppError("Invalid email or password ")

    const { _id, name ,phone, age} = user
    const token = await jwt.sign({ email, _id, name ,phone,age }, process.env.SECRET_KEY)

    res.status(200).json({ message: "Login Successfully ", token })


})