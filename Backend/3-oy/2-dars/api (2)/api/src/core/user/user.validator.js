import Joi from "joi";

export const createUserValidator = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "username ni kirgizish shart!",
    "string.base": "username string bolishi shart",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email ni kirgizish shart!",
    "string.base": "email string bolishi shart",
    "string.email": "qator email bolishi kerak",
  }),
  password: Joi.string()
    .required()
    .custom((value, helper) => {
      if (!/[A-Z]/.test(value)) {
        return helper.message("Parolda katta harif bolishi shart");
      }
      if (!/[a-z]/.test(value)) {
        return helper.message("Parolda kichik harif bolishi shart");
      }
      if (!/[0-9]/.test(value)) {
        return helper.message("Parolda  raqam bolishi shart");
      }
      if (!/[!@#$%%^&*]/.test(value)) {
        return helper.message("Parolda belgi bolishi shart");
      }
      if (value.length < 6) {
        return helper.message("Parol 6 tadan kam bolmasligi kerak");
      }
      return value;
    }),
  confirmPassword: Joi.required().valid(Joi.ref("password")),
  role: Joi.string().required().valid("buyer", "seller"),
});

// export const idValidator = Joi.object({
//   id: Joi.required().custom((value, helper) => {
//     if (isNaN(value)) {
//       return helper.message("Notog'ri id kirgizildi");
//     }
//     return value;
//   }),
// });

// export const udpateUserValidator = Joi.object({
//   username: Joi.string().messages({
//     "string.empty": "username ni kirgizish shart!",
//     "string.base": "username string bolishi shart",
//   }),
//   email: Joi.string().email().messages({
//     "string.empty": "email ni kirgizish shart!",
//     "string.base": "email string bolishi shart",
//     "string.email": "qayor email bolishi kerak",
//   }),
//   password: Joi.string().custom((value, helper) => {
//     if (!/[A-Z]/.test(value)) {
//       return helper.message("Parolda katta harif bolishi shart");
//     }
//     if (!/[a-z]/.test(value)) {
//       return helper.message("Parolda kichik harif bolishi shart");
//     }
//     if (!/[0-9]/.test(value)) {
//       return helper.message("Parolda  raqam bolishi shart");
//     }
//     if (!/[!@#$%%^&*]/.test(value)) {
//       return helper.message("Parolda belgi bolishi shart");
//     }
//     if (value.length < 6) {
//       return helper.message("Parol 6 tadan kam bolmasligi kerak");
//     }
//     return value;
//   }),
//   confirmPassword: Joi.valid(Joi.ref("password")),
//   role: Joi.string().valid("buyer", "seller"),
// });
