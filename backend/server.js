const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Product = require('./models/product')
const Category  = require('./models/category')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const Visitor = require('./models/visitor')
const server  = express()
const { auth } = require('./auth')
const bcrypt = require('bcrypt')
const productRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')

server.use(express.json())
server.use(
    cors({
        origin: '*', 
        credentials:true,
        optionSuccessStatus:200
    }))
    
server.use('/products', productRouter)
server.use('/categories', categoriesRouter)


server.post('/signup', async (req, res) => {
    try {
        
        const {email, password} = req.body;
        const exict = await User.exists({email}) 
        if (exict) {
           return res.json({message: 'There is already user with this email'})
        }
        
        const token = await jwt.sign(user._id.toString(), 'asd')
         
        const user = new User({email, password, token})
        await user.save()
        return res.json({message: 'User has created', token}).status(201)

    } catch(e) {
        console.log(e);
        res.send(e).status(500)
}
})

server.post('/login', async (req, res) => {
    try {
        
        console.log(req.body.email);
        const user = await User.findOne({email: req.body.email}) 
        
        if (!user) {
            return res.status(400).send({ errMessage: "Incorrect email" })
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({ errMessage: "Incorrect passward" })
        }
        
        const token = await jwt.sign(user._id.toString(), 'asd')
        user.token = token;
        res.send({email: req.body.email, token})
        
    } catch(e) {
        console.log(e);
        res.send(e).status(500)
    }
})





server.listen(3000, () => {
    console.log('on port 3000');
})

mongoose.connect('mongodb://127.0.0.1/evergreen')
const db = mongoose.connection
db.on('error', error => console.error('faild to connect mongoose', error))
db.once('open', () => console.log('connected to mongoose'))


// server.get('/cart', async (req, res) => {
    //     try {
        //         const _id = await jwt.verify(req.query.visitorToken, 'visitorToken')
        //         const visitor = await Visitor.findOne({_id})
        //         let arr = []
        //         await visitor.cartProducts.forEach( async (cartProduct) => {
            //             let x = await Product.findById(cartProduct.product)
            //             arr.push({ product: x, amount: cartProduct.amount })
            //         })
            //         setTimeout(() => {
                //             console.log(arr);
                //             res.json({products: arr})
                
                //         }, 100)
                //     } catch(e){
                    
                    //     }
                    
                    // })
                    
                    
                    // server.post('/cart', async (req, res) => {
                        
//     try {
    //         const visitorToken = req.query.visitorToken
    //         const visitor = await Visitor.findOne({visitorToken})
    //         if (!visitor){ 
        //             return res.json({error: 'visitor not found'}).status(404)
        //         }
        
        //         const exist = false;
        
        //         for (let i = 0; i < visitor.cartProducts.length; i++) {
            //             if (visitor.cartProducts[i].product === req.body.product._id) {
                //                 if (req.body.amount > 1) {
                    //                 visitor.cartProducts[i].amount += Number(req.body.amount);
                    //                 exist = true;
                    //                 break;
                    //                 }
                    //                 else {
                        //                 visitor.cartProducts[i].amount++;
                        //                 visitor.cartProducts.push({product: req.body.product, amount:1})
                        //                 exist = true;
                        //                 break;
                        //                 }
                        
                        //             } 
                        
                        //         }
                        //         if (!exist) {
                            //             visitor.cartProducts.push({product: req.body.product._id, amount: req.body.amount})
                            //         }
                            
                            //         await visitor.save()
                            
                            //     } catch(e) {
                                //         console.log(e);
//     }
// })


// server.get('/', async (req, res) => {
//     try {
//         const visitor = await new Visitor({})
//         await visitor.save();
//         visitor.visitorToken = await jwt.sign(visitor._id.toString(), 'visitorToken')
//         await visitor.save()
//         res.json({visitorToken: visitor.visitorToken}).status(200)
//      } catch(e) {
//         console.log(e);
//     }
// })













                    