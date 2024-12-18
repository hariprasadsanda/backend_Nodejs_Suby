 const mongoose= require('mongoose')

 const vendorSchema = new mongoose.Schema({
    username:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    password:{
        type:String,
        requried:true
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]

 });

 const Vendor =  mongoose.model('Vendor',vendorSchema);


 module.exports = Vendor