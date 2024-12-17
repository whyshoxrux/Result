import Joi from "joi";

export const registerValidator = Joi.object({
  
    name: Joi.string().required(),
    address: Joi.string().required()
});

export const idValidator = Joi.object({
  id: Joi.required().custom((value, helper) => {
    if (isNaN(value)) {
      return helper.message("Notog'ri id kirgizildi");
    }
    return value;
  }),
});

export const udpateValidator = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required()
});
