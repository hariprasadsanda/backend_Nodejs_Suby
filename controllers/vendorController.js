const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();
const secretKey = process.env.WhatIsYourName;

// Vendor Registration
const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });

        await newVendor.save();
        console.log('Registered');
        return res.status(201).json({ message: "Registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Vendor Login
const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });
        const vendorId = vendor._id;

        console.log(email);
        return res.status(200).json({ success: "Login successful", token, vendorId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get All Vendors
const getAllvendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        return res.status(200).json({ vendors });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get Vendor by ID
const getVendorById = async (req, res) => {
    const vendorId = req.params.id;

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        const vendorFirmId = vendor.firm[0]?._id; // Use optional chaining to avoid errors if firm is undefined
        const vendorFirmDetails = vendor.firm[0]; // Adjust if firm is not an array

        // Send only one response
        return res.status(200).json({ vendor, vendorFirmId, vendorFirmDetails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { vendorRegister, vendorLogin, getAllvendors, getVendorById };
