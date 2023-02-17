const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/loginLogout")
const registerdUser = require("../models/registerSchema")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser")
var jwt = require('jsonwebtoken');
const authenticateJWT = require("../middlewares/authenticate")
const secret = "secret"
const cors = require("cors")
const router = express.Router();
router.use(bodyParser())
router.use(cors())


router.post("/", body('email').isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const email = req.body.email;
        const password = req.body.password;

        const data = await registerdUser.findOne({ email: email})
        if (data) {
            bcrypt.compare(password, data.password, function (err, result) {
                // result == true
                if (err) {
                    return res.status(400).json({
                        status: "Failed",
                        message: "No user exists"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: data.email
                    }, secret);

                    res.status(200).json({
                        status: "success",
                        message: "User logged in",
                        token
                    })
                }
                else{
                    return res.status(400).json({
                        status:"failed",
                        message:"Login Unsuccessful"
                    })
                }
            });
        }
        else{
            res.status(400).json({
                status:"failed",
                message:"Login Unsuccessful"
            })
        }


    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

module.exports = router;
