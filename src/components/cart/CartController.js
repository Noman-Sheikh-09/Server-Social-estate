const CartModal = require("./CartModal");
const getCart = async (req, res) => {
  try {
    const resValue = await CartModal.find();
    console.log("get in cart controller", resValue);
    let response = {
      status: 200,
      message: "successfully found Cart Data",
      data: resValue,
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 404,
      message: error.message,
    };
    res.json(response);
  }
};

const addCart = async (req, res) => {

const cartNewItem = {
    product : req.body,
    quantity : Number.parseInt(req.body.quantity),
    userId : req.body.userId
}
const resValue = new CartModal(cartNewItem) 
try {
       await  resValue.save();
        console.log('add to cart done',resValue);
        let response = {
            status: 200,
            message: "Successfully Add to Cart",
            data:resValue
          };
          res.json(response);


    } catch (error) {
        let response = {
            status: 404,
            message: error.message,
          };
          res.json(response);
    }
};
const updateCart = (req, res) => {};
const deleteCart = (req, res) => {};

module.exports = {
  getCart,
  addCart,
  updateCart,
  deleteCart,
};
