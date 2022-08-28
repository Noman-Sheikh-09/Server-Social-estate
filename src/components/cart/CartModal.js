const mongoose = require("mongoose");
const {Schema}= mongoose;

const CartSchema = new Schema( {
    userId: { type: String, required: true },
    product: {
      type: Object,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true })

const CartModal = mongoose.model("CartModal", CartSchema)
module.exports= CartModal
