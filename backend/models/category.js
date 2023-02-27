const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    childrens: {
        type: [{name: {
            type: String,
            required: true
        },
    }]
    },
    fathers: {
        type: [{name: {
        type: String,
        required: true
    },
}]
        
    }
})

module.exports = mongoose.model('Category', Category)