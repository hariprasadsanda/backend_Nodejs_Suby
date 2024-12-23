
const Product = require('../models/Product');
const multer= require('multer')
const Firm = require('../models/Firm')
const path= require('path')


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
  

const addProduct = async(req,res)=>{
  try {
    const {productName , price , discription ,category, bestseller } = req.body
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if(!firm){
        res.status(404).json({error:"firm not found"})
    }

    const product = new Product({
        productName , price , discription ,category, bestseller,image, firm:firm._id
    })

    const savedProducts = await product.save();
    firm.product.push(savedProducts);
    await firm.save();

    res.status(200).json({success:"product added successfully"})

    
  } catch (error) {
    
    res.status(404).json({error:"internal error"})
  }
}

const getProductsByFirm= async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firmId){
            return res.status(404).json({error:"no firm found"})

        }
        const HotelName = firm.firmName;
        const products = await Product.find({firm:firmId});
        res.status(200).json({HotelName ,products});
        
    } catch (error) {
        res.status(404).json({error:"internal error"})
    }
}

const delectProductById = async(req,res)=>{
    try {
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({error :"no product found"})
        }
    } 
    catch (error) {
        res.status(404).json({error:"internal error"})

        
    }
}


module.exports = {
    addProduct: [upload.single('image'), addProduct],getProductsByFirm, delectProductById
  };
  