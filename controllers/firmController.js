const path = require('path');
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');


// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, Date.now()+ path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  


// Controller Logic
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    // Find vendor by ID
    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // Create a new Firm instance
    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    // Save the firm to the database
    await firm.save();
     // Now update the vendor's firm list
     vendor.firm.push(firm._id); // Add the firm's _id to the vendor's firm array
     await vendor.save(); // Save the updated vendor

    res.status(201).json({
      message: 'Firm added successfully',
      firm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteFirmById = async(req,res)=>{
  try {
    const firmId= res.params.firmId;
    const deletedFirm = await Firm.findByIdAndDelete(firmId)

    if(!deletedFirm){
      return res.status(404).json({error:"firm not found"})
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });

    
  }
}

// Export the controller with Multer middleware applied
module.exports = {
  addFirm:[upload.single('image'), addFirm],deleteFirmById
};
