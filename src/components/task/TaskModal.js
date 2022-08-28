const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: String,
  category:String,
  location:String,
  phone:String,
  userId:String,
  createdAt: { type: Date, default: new Date() },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
