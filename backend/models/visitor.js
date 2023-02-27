const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Product = require('./product')

const Visitor = new mongoose.Schema({
    visitorToken: {
        type: String
    },

    cartProducts: [{
        product: {type: mongoose.SchemaTypes.ObjectId, ref: 'Product'},
        amount: Number
    }]
})



module.exports = mongoose.model('Visitor', Visitor)