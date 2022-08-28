const express = require("express");

const router = express.Router();
const TaskController = require("./TaskController");
const authUtils = require("../utils/auth");
router.get("/get", TaskController.getTask);
router.post("/add", TaskController.addTask);
router.put("/update/:id", TaskController.updateTask);
router.delete("/delete/:id", TaskController.deleteTask);

module.exports = router;
