const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new Schema({
  email:String,
  age: String,
  name:String,
  password:String,
  createdAt:{type:Date, default: Date.now},
  });

const UserModal = mongoose.model("UserModal", UserSchema);
module.exports = UserModal;
