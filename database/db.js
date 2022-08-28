const mongoose = require("mongoose");

const setup= async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected with Database");

    } catch (error) {
        console.log(error.message);
    }
}
module.exports = setup