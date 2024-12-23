const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: [true, "Firm name is required"],
        unique: true,
        trim: true
    },
    area: {
        type: String,
        required: [true, "Area is required"],
        trim: true
    },
    category: {
        type: [
            {
                type: String,
                enum: ["veg", "non-veg"], // Allowed values
                required: [true, "Category is required"]
            }
        ],
        validate: {
            validator: function (categories) {
                return categories.length > 0; // At least one category must be selected
            },
            message: "At least one category must be selected"
        }
    },
    region: {
        type: [
            {
                type: String,
                enum: ["south-indian", "north-indian", "chinese", "bakery"], // Allowed values
                required: [true, "Region is required"]
            }
        ],
        validate: {
            validator: function (regions) {
                return regions.length > 0; // At least one region must be selected
            },
            message: "At least one region must be selected"
        }
    },
    offer: {
        type: String,
        trim: true
    },
    image: {
        type: String, // Stores the file path or URL of the uploaded image
        required: [true, "Image is required"]
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor', // Reference to Vendor model
            required: [true, "Vendor reference is required"]
        }
    ],
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' // Reference to Product model
        }
    ]
});

// Compile and export the model
const Firm = mongoose.model('Firm', firmSchema);
module.exports = Firm;
