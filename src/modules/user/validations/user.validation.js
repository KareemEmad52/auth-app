import Joi from "joi";

export const addUserSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[A-Za-z0-9]{7,}')).required(),
        phone: Joi.string().pattern(/^0?1\d{9}$/).required(),
        age: Joi.number().min(18).required()
    },
    params: {},
    query: {}
})

export const logInSchema = Joi.object({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
    params: {},
    query: {}
})