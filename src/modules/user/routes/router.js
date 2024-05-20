import { Router } from "express";
import { addUser, login } from "../controllers/user.controller.js";
import { uniqueEmail } from "../middlewares/user.middleware.js";
import { validate } from "../../../utils/validate.js";
import { addUserSchema, logInSchema } from "../validations/user.validation.js";

let router = Router()

router.post('/signup' ,validate(addUserSchema),uniqueEmail, addUser)
router.post('/login' ,validate(logInSchema), login)

export default router