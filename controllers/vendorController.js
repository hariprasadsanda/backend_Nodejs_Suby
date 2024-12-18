const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();
const screatKey = process.env.WhatIsYourName


const vendorRegister = async(req,res)=>{
    const {username,email,password} = req.body
try{
    const vendorEmail = await Vendor.findOne({email});
    if(vendorEmail){
        return res.status(400).json("email already taken");
    }
    const hashedPassword = await bcrypt.hash(password,10);

    const newVendor = new Vendor({
        username,
        email,
        password:hashedPassword
    });
    await newVendor.save();

    res.status(201).json({message:"registered sucessfully"})
    console.log('registered')
}
catch(error){
    res.status(500).json({error:"internal srever error"})
    console.error(error);
}

}

const vendorLogin = async(req,res)=>{
    const {email,password}= req.body

    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"invaild username or password"})

        }

        const token = jwt.sign({vendorId:vendor._id},screatKey,{expiresIn:"1h"})

        res.status(200).json({success:"Login successful",token})
        console.log(email); 
    }
    catch(error){
        console.log(error)
    }
}


const getAllvendors =async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors});

    } catch (error) {
        res.status(500).json({error:"internal srever error"})
        
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.id;

    try {
        const vendor = await Vendor.findById(vendorId);
        if(!vendor){
            return res.status(404).json({error:"Vendor not found"})
        }
        res.status(200).json({ vendor })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
        
    }
}
module.exports = {vendorRegister , vendorLogin , getAllvendors, getVendorById}

