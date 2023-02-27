const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }, 

    token: {
        type: String
    }
})


User.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8)
    next()
})


module.exports = mongoose.model('User', User)