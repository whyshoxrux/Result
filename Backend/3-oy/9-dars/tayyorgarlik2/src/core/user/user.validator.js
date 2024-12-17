import Joi from 'joi'

export const createUserValidator = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})