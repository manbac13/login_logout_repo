const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/loginLogout")
const registerdUser = require("../models/registerSchema")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser")
const cors = require("cors")

const router = express.Router();
router.use(bodyParser())
router.use(cors())

router.get("/allUsers", async (req, res) => {
    try {
        const data = await registerdUser.find()
        res.status(200).json({
            status: "success",
            data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
})

router.post("/", body('email').isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let password = req.body.password;
        let email = req.body.email
        let exist = await registerdUser.findOne({ email: email })
        bcrypt.hash(password, 5, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(400).json({
                    status: "failed",
                    message: err.message
                })
            }

            if (!exist) {
                const userData = await registerdUser.create({
                    email: email,
                    password: hash
                })
                res.status(200).json({
                    status: "success",
                    message: "User Registered Successfully",
                    userData
                })
            }
            else {
                res.status(200).json({
                    status: "failed",
                    message: "User already registered",
                })
            }

        });

    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

})

module.exports = router