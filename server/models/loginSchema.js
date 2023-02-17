const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/loginLogout")

const Schema = mongoose.Schema;

const loginSchema = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

const loginUser = mongoose.model("loginUser", loginSchema)

module.exports = loginUser;