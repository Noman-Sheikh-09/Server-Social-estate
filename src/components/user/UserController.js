const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const UserModal = require("./UserModal");

const signin = async (req, res) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });
    if (!user) {
      let response = {
        status: 404,
        message: "user does not exist",
        data: user,
      };
      res.json(response);
    }
    console.log("user in signin", user);

    const passwordChek = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    console.log("passwordcheck", passwordChek);
    if (!passwordChek) {
      let result = {
        status: 500,
        message: "Incorrect Password",
      };
      res.json(result);
    }
    var token = jwt.sign(
      {
        email: user.email,
        age: user.age,
        name: user.name,
      },
      process.env.PRIVATE_KEY
    );
    let response = {
      status: 200,
      message: "Successfully Login",
      token,
      email: user.email,
      age: user.age,
      name: user.name
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 201,
      message: error.message,
    };
    res.json(response);
  }
};

const signup = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.email ||
    !req.body.password
  ) {
    let response = {
      status: 201,
      message: "params are required",
    };
    res.json(response);
  }

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: hash,
  };
  console.log(newUser);
  const user = new UserModal(newUser);

  try {
    await user.save();
    var token = jwt.sign(
      {
        email: user.email,
        age: user.age,
        name: user.name,
      },
      process.env.PRIVATE_KEY
    );
    let response = {
      status: 200,
      message: "Successfully Signup",
      token: token,
      email: user.email,
      age: user.age,
      name: user.name,
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 500,
      message: error,
    };
    res.json(response);
  }
};

const getActiveUser = async (req, res) => {
  try {
    const { token } = req.body;
    var tokenCheck = await jwt.verify(token, process.env.PRIVATE_KEY);
    if (tokenCheck?.email) {
      const user = await UserModal.findOne({ email: tokenCheck?.email });
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "User not found",
          statusCode: 404,
        });
        return;
      }
      let response = {
        status: 200,
        message: "Welcome Back!",
        email: user.email,
        age: user.age,
        name: user.name,
      };
      res.json(response);
    }
  } catch (error) {
    let response = {
      status: 201,
      message: error.message,
    };
    res.json(response);
  }
};

module.exports = {
  signin,
  signup,
  getActiveUser
};
