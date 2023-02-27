const mongoose = require('mongoose')

const Product = new mongoose.Schema({

    
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
    },

    photoUrl: {
        type: [String],
        
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Product', Product)