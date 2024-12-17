import Joi from "joi";

export const createUserValidator = Joi.object({
    first_name: Joi.string().required(),
    second_name: Joi.string().required(),
    email: Joi.string().required(),
    
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.required().valid(Joi.ref("password")),
    role: Joi.valid('user', 'admin').required(),
    kafedra_id: Joi.number().required()
    
})

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})
