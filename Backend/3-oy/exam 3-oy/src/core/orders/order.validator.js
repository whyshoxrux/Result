import Joi from "joi";

export const registerValidator = Joi.object({
  user_id: Joi.number().required(),
  book_id: Joi.number().required(),
  quantity: Joi.number().required(),
  total_price: Joi.number().required(),
});

export const idValidator = Joi.object({
  id: Joi.required().custom((value, helper) => {
    if (isNaN(value)) {
      return helper.message("Notog'ri id kirgizildi");
    }
    return value;
  }),
});

