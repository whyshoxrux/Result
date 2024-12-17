import {
  createUserValidator
} from "./user.validator.js";

export function addUser(req, res) {
  try {
    const { error, value } = createUserValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("Hatolik boldi" + err.message);
  }
}

// export function getAllUser(req, res) {
//   try {
//     const { error, value } = createUserValidator.validate(req.body);
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }
//     res.status(200).send("ok");
//   } catch (err) {
//     res.status(500).send("Hatolik boldi" + err.message);
//   }
// }

// export function getUser(req, res) {
//   try {
//     const { error } = idValidator.validate(req.params);
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }

//     res.status(200).send("ok get User");
//   } catch (err) {
//     res.status(500).send("Hatolik boldi" + err.message);
//   }
// }

// export function updateUser(req, res) {
//   try {
//     const { error: errorParams } = idValidator.validate(req.params);
//     if (errorParams) {
//       return res.status(400).send(errorParams.details[0].message);
//     }
//     const { error: errorBody } = udpateUserValidator.validate(req.body);
//     if (errorBody) {
//       return res.status(400).send(errorBody.details[0].message);
//     }
//     res.status(200).send("ok");
//   } catch (err) {
//     res.status(500).send("Hatolik boldi" + err.message);
//   }
// }
// export function deleteUser(req, res) {
//   try {
//     const { error } = idValidator.validate(req.params);
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }
//     res.status(200).send("ok");
//   } catch (err) {
//     res.status(500).send("Hatolik boldi" + err.message);
//   }
// }
