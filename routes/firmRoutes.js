const express = require('express')
const verifyToken = require('../middleware/verifyToken')

const firmController = require('../controllers/firmController');
const { route } = require('./productRoutes');

const router = express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = res.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(Path.join(__dirname,'..','uploads',imageName));    
})
router.delete('/:firmId',firmController.deleteFirmById)

module.exports= router

