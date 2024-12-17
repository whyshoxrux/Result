import {createOrderValidator } from "./order.validator.js";

export function addOrder(req, res) {
    try {
      const { error, value } = createOrderValidator.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      res.status(200).send("ok");
    } catch (err) {
      res.status(500).send("Hatolik boldi" + err.message);
    }
  }

// export function getAllOrder(req, res){
//   try{
//     res.send("ok")
//   } catch(err){
//     response.send("Xatolik bo'ldi " + err.message)
//   }
// }

// export function getOrder(req, res){
//   try{
//     const {error} = idValidator.validate(req.params);
//     if(error){
//       return res.send(error.details[0].message)
//     }
//     res.send("Ok get order")
//   }  catch(err){
//     res.send("Xatolik boldi: " + err.message)
//   }
// }

// export function updateOrder(req, res){
//   try{
//     const {error: errorParams} = idValidator.validate(req.params);
//     if(errorParams){
//       return res.send(error.params.details[0].message)
//     }
//     const {error: errorBody} = updateOrderValidator.validate(req.body)
//     if(errorBody){
//       return res.send(errorBody.details[0].message)
//     }
//     res.send("Ok")
//   } catch(err){
//     res.send("Xatolik boldi: " + err.message)
//   }
// }

// export function deleteOrder(req, res){
//   try{
//     const {error} = idValidator.validate(req.params);
//     if(error){
//       return res.send(error.details[0].message)
//     }
//     res.send("ok")
//   } catch(err){
//     res.send("Xatolik boldi " + err.message)
//   }
// }