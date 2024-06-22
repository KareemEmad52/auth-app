import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AppError, CatchAsyncError } from "../../../utils/error.handles.js";
import { userModel } from "../model/user.model.js";
import axios from "axios";
import env from "dotenv"

env.config();

export const addUser = CatchAsyncError(async (req, res) => {

    const { name, email, password, phone, age } = req.body

    const hashedPassword = bcrypt.hashSync(password, 5)

    const user = await userModel.create({ name, email, password: hashedPassword, phone, age })


    res.status(201).json({ message: "User Created Successfully " })
})

export const getUser = CatchAsyncError(async (req, res) => {

  const { token } = req.body

  const {name} = jwt.decode(token,process.env.SECRET_KEY)

  const user = await userModel.findOne({ name },{password:false ,_id:false})

  if(!user) throw new AppError("User Not Found !") 


  res.status(201).json({ message: "Successfully " ,user })
})



export const login = CatchAsyncError(async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })


    if (!user || !bcrypt.compareSync(password, user.password)) throw new AppError("Invalid email or password ")

    const { _id, name, phone, age } = user
    const token = await jwt.sign({ email, _id, name, phone, age }, process.env.SECRET_KEY)

    res.status(200).json({ message: "Login Successfully ", token })


})



const sendMessageToHuggingFace = async (message, retries = 5) => {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        { inputs: message },
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 503 && retries > 0) {
        console.log(`Model is loading, retrying... (${retries} attempts left)`);
        await new Promise(res => setTimeout(res, 5000)); // Wait for 5 seconds before retrying
        return sendMessageToHuggingFace(message, retries - 1);
      } else {
        throw error;
      }
    }
  };


export const chatRes = CatchAsyncError(async (req, res) => {
    const userInput = req.body.message;
  
    try {
      const response = await sendMessageToHuggingFace(userInput);
      res.json(response);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).send('Error communicating with Hugging Face API');
    }
  })