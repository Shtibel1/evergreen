const mongoose = require('mongoose')
const Product = require('./product')

const Cart = new mongoose.Schema({
    products: {
        type: [Product]
    },

    amount: Number
})

module.exports = mongoose.model('Cart', Cart)