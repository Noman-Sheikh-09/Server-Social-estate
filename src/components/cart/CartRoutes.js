const express = require("express");

const router = express.Router();
 CartController = require("./CartController")
 router.get("/get", CartController.getCart)
 router.post("/add", CartController.addCart  )
 router.put("/update", CartController.updateCart )
 router.delete("/delete", CartController.deleteCart )

module.exports = router;    