var jwt = require("jsonwebtoken");

const auth = async (req, res,next) => {
    try {
      var token = req.headers.token
      console.log("token in utils", token);
      if (!token) {
        let response = {
            status: 200,
            message: "Token Not Found",
          };
          res.json(response);
      }
      
      var decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
    
      if (!decoded) {
          let result = {
            status: 200,
            message: "User is Not Authenticated",
          };
          res.json(result);
        }
      next()
    } catch (error) {
        console.log("error",error);
      let response = {
        status: 201,
        message: error,
      };
      res.json(response);
    }
  };
  

  module.exports = {
    auth
  };