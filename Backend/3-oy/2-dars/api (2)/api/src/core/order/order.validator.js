import Joi from "joi";

export const  createOrderValidator = Joi.object({
    buyer: Joi.number().required(),
    product: Joi.number().required(),
    quantity: Joi.number().required(),
    totalPrice: Joi.number().required(),
    status: Joi.string().required().valid("pending", "shipped", "delivered", "canceled")
})

// export const idValidator = Joi.object({
//     id: Joi.required().custom((value, helper) => {
//         if(isNaN(value)){
//             return helper.message("Notogri id kiritildi")
//         }
//         return value
//     })
// })

// export const updateOrderValidator = Joi.object({
//     buyer: Joi.number().message(),
//     product: Joi.number().required(),
//     quantity: Joi.number().required(),
//     totalPrice: Joi.number().required(),
//     status: Joi.string().required().valid("pending", "shipped", "delivered", "canceled")
// })