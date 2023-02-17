const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/loginLogout")

const Schema = mongoose.Schema;

const bookDetailSchema = new Schema({
    title:{type:String},
    author:{type:String},
    isbn:{type:String},
    publisher:{type:String},
    published_date:{type:String},
    description:{type:String},
    reader:{type:String}
})

const books = mongoose.model("books", bookDetailSchema);

module.exports = books;