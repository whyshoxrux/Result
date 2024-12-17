import {createProductValidator} from "./product.validator.js";

export function addProduct(req, res) {
    try {
      const { error, value } = createProductValidator.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      res.status(200).send("ok");
    } catch (err) {
      res.status(500).send("Hatolik boldi" + err.message);
    }
  }

// export function getAllProduct(req, res){
//     try{
//         res.status(200).send("ok")
//     } catch(err){
//         res.status(500).send("Xatolik boldi " + err.message)
//     }
// }

// export function getProduct(req, res){
//     try{
//         const {error} = idValidator.validate(req.params);
//         if(error){
//             return res.status(400).send(error.details[0].message)
//         }
//     res.send("Ok get User")
//     } catch(err){
//         res.status(500).send("Xatolik bo'ldi " + err.message)
//     }
// }

// export function updateProduct(req, res){
//     try{
//         const {error: errorParams} = idValidator.validate(req.params);
//         if(errorParams){
//             return res.status(400).send(errorParams.details[0].message);
//         }
//         const {error: errorBody} = updateProductValidator.validate(req.body);
//         if (errorBody){
//             return res.status(400).send(errorBody.details[0].message);
//         }
//         res.status(200).send("ok");
//     } catch(err){
//         res.status(500).send("Xatolik boldi " + err.message)
//     }
// }

// export function deleteProduct(req, res){
//     try{
//         const {error} = idValidator.validate(req.params);
//         if(error){
//             return res.status(400).send(error.details[0].message);
//         }
//         res.status(200).send("ok")
//     } catch(err){
//         res.status(500).send("Xatolik boldi: " + err.message)
//     }
// }