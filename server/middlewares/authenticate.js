const express = require("express")
var jwt = require('jsonwebtoken');
const secret = "secret"

const authenticateJWT = async (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader

        jwt.verify(token, secret, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"failed",
                    message:err.message
                })
            }
            req.user = decoded
            next()

          });
    }
    else{
        res.status(400).status({
            status:"failed",
            message:'user not authorized'
        })
    }
}

module.exports = authenticateJWT