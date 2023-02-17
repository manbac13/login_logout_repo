const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/loginLogout")
const book = require("../models/bookDetailSchema")
const authenticateJWT = require("../middlewares/authenticate")
const bodyParser = require("body-parser")
const cors = require("cors")
const router = express.Router();

router.use(bodyParser())
router.use(cors())
router.use("/", authenticateJWT)

router.get("/", async (req, res) => {
    try {
        const readeremail = req.user.data
        console.log(readeremail)
        const bookData = await book.find({reader:readeremail})
        res.status(200).json({
            status:"success",
            readeremail,
            bookData
            
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
})

router.post("/", async (req, res) => {
    try {
        let reader = req.user.data
        console.log(reader)
        const bookData = await book.create({
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            published_date: req.body.published_date,
            description: req.body.description,
            reader : reader
        })   
        res.status(200).json({
            status: "success",
            bookData
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
})

module.exports = router