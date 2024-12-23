const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const Firm = require('./Firm')

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        requried:true
    },
    price:{
        type:String,
        requried:true
    },
    image:{
        type:String
    },
    discription:{
        type:String,
        requried:true
    },
    category:[
        {
            type:String,
            enum:["veg","non-veg"]
        }
    ],
    bestseller:{
        type:Boolean
    },
    firm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }
})

const products= mongoose.model('Product',productSchema);
module.exports = products