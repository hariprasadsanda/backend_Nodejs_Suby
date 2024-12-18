const Vendor= require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv=require('dotenv');
const { status } = require('express/lib/response');


dotEnv.config();
const screatKey= process.env.WhatIsYourName

const verifyToken= async(req,res,next)=>{
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error:"token is requried"});
    }
    try {
        const decoded = jwt.verify(token,screatKey)
        const vendor = await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res,status(404).json({error:"vendor is not found"})
        }
        

        req.vendorId= vendor._id

        next()

        
    } catch (error) {

        console.error(error)
        return res.status(500).json({error:"inavaild token"})
        
    }
}

module.exports = verifyToken
