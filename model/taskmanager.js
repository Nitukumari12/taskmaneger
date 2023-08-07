const mongoose = require("mongoose");
const data = new mongoose.Schema({
    name:String,
    task:String,
    status:String,
})
const userData = mongoose.model("userData",data);
module.exports = userData;