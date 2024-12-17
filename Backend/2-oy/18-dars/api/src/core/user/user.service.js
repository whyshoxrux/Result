import { UserModel } from "./user.model.js";

export async function addUser(req, res) {
  try {
    const newUser = req.body;
    const result = await UserModel.create(newUser);
    res.send(result)
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function getAllUser(req, res) {
  try{
    const result = await UserModel.find();
    res.send(result)
  } catch(err){
    res.send("Xatolik boldi: " + err.message)
  }
}
export async function getUser(req, res) {
  try {
    const result = await UserModel.findOne();
    res.send(result)
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function updateUser(req, res) {
  try {
    const {id} = req.params;
    const updateUser = req.body;
    const result = await UserModel.findOneAndUpdate({_id : id});
    res.send(result)
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function deleteUser(req, res) {
  try {
    const result = await UserModel.deleteOne();
    res.send(result)
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
