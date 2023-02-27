const jwt = require('jsonwebtoken');
const User = require('./models/user')

async function auth(req, res, next) {
    const token = req.query.token
    if (!token || token == 'undefined') return res.send({error: 'please auth', message:'please auth'})
    
    const decoded = await jwt.verify(token, 'asd')
    const user = await User.find({_id: decoded._id, token: token})

    if (!user) {
        return res.send({error: 'please auth', message: 'please auth'})
    }

    req.user = user
    req.token = token
    next()
}

module.exports = {
    auth
}