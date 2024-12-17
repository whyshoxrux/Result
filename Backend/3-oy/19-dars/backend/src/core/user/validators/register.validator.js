import Joi from "joi";

const registerValidator = Joi.object({
  first_name: Joi.string().required(),
  second_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required().valid("ADMIN", "OPERATOR"),
});
export default registerValidator;
