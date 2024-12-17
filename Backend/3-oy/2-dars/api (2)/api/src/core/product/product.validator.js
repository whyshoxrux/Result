import Joi from "joi";

export const createProductValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    seller: Joi.number().required()
})

// export const idValidator = Joi.object({
//     id: Joi.required().custom((value, helper) => {
//         if (isNaN(value)){
//             return helper.message("Notogri id kiritildi")
//         }
//         return value
//     })
// })

// export const updateProductValidator = Joi.object({
//     name: Joi.string().message(),
//     description: Joi.string().message(),
//     price: Joi.number().message(),
//     stock: Joi.number().message(),
//     seller: Joi.number().message()
// })