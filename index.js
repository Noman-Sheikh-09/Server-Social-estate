require("dotenv").config();
var bodyParser = require("body-parser");
const express = require("express");
var cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;

const taskRouter = require("./src/components/task/TaskRoutes");
const cartRouter = require("./src/components/cart/CartRoutes")
const userRouter = require("./src/components/user/UserRoutes")
const setup = require("./database/db");

app.use(bodyParser.urlencoded({limit:'30mb', extended: true }));
app.use(bodyParser.json({limit:'30mb', extended: true }));
app.use(cors());

app.use("/tasks", taskRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);


app.listen(PORT, () => {
  console.log("Running on port 4000");
});

setup();
