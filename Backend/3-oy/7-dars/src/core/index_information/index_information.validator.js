import Joi from "joi";

export const createIndex_InformationValidator = Joi.object({
    teacher_id: Joi.number().required(),
    index_form_id: Joi.number().required(),
    status: Joi.string().required(),
    rate: Joi.number().required()
})