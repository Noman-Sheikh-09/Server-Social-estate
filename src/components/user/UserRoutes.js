const express = require("express");
 
const router = express.Router();
const UserController = require("./UserController")

router.post("/signin",  UserController.signin)
router.post("/signup",  UserController.signup)
router.post("/getActiveUser",  UserController.getActiveUser)

module.exports = router ;