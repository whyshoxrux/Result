import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
    first_name:{type: String, require: true},
    second_name:{type: String, require: true}
})



export const UserModel = mongoose.model("users", UserSchema)