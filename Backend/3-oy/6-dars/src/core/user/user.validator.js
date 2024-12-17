import Joi from "joi";

export const createUserValidator = Joi.object({
    first_name: Joi.string().required(),
    second_name: Joi.string().required(),
    email: Joi.string().required(),
    
    password: Joi.string().min(6).required().custom((value, helper) => {
        if(!/[A-Z]/.test(value)){
            return helper.message("Parolda katta harf ishtirok etishi kerak toybola")
        }
        if(!/[a-z]/.test(value)){
            return helper.message("Parolda kichik harf qatnashishi kerak")
        }
        if(!/[0-9]/.test(value)){
            return helper.message("Parolda raqam qatnashishi kerak")
        }
        if(!/[!@#$%^*&]/.test(value)){
            return helper.message("Parolda belgilar qatnashishi kerak")
        }
        if(value.length < 6){
            return helper.message("Parol 6 tadan kam bomasligi kerak")
        }
        return value;
    }),
    confirmPassword: Joi.required().valid(Joi.ref("password")),
    age: Joi.number().required()
    
})

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})
