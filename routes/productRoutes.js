const express = require('express')
const productController= require('../controllers/productController')

const router= express.Router();

router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/products',productController.getProductsByFirm)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = res.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(Path.join(__dirname,'..','uploads',imageName));
})
router.delete('/:productId',productController.delectProductById)

module.exports=router;