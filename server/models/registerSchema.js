const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/loginLogout")

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

const registerdUser = mongoose.model("registerdUser", registerSchema)

module.exports = registerdUser;