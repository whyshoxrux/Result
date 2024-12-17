import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name ni kirgizish shart!",
    "string.base": "name string bo'lishi shart",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email ni kirgizish shart!",
    "string.base": "email string bo'lishi shart",
    "string.email": "qator email bo'lishi kerak",
  }),
  password: Joi.string().required(),
  role: Joi.string().required().valid("ADMIN", "USER", "SELLER"),
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
  name: Joi.string().messages({
    "string.empty": "username ni kirgizish shart!",
    "string.base": "username string bo'lishi shart",
  }),
  email: Joi.string().email().messages({
    "string.empty": "email ni kirgizish shart!",
    "string.base": "email string bo'lishi shart",
    "string.email": "qator email bo'lishi kerak",
  }),
  password: Joi.string(),
  role: Joi.string().valid("ADMIN", "USER", "SELLER"),
  status: Joi.required()
});
