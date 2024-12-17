import Joi from "joi";

export const createKafedraValidator = Joi.object({
    name: Joi.string().required()
})