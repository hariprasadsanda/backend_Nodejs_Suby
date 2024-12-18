const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName:{
        type:String,
        requried:true,
        unique:true
    },
    area:{
        type:String,
        requried:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg'] 
                // enum is used when we use mutliple values
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','chinese','bakery']
            }
        ]
    },
    offer:{
        type:String,

    },
    image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            // by using this we attached the vendor with the firm.
            ref:'Vendor'
        }
    
    ],
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})

const Firm = mongoose.model('Firm',firmSchema);

module.exports = Firm