import Joi from "joi";

export const createUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})