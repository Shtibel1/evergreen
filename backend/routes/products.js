const express = require('express')
const router = express.Router()
const { auth } = require('../auth')
const mongoose = require('mongoose')
const Product = require('../models/product')
const Category  = require('../models/category')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Visitor = require('../models/visitor')

router.get('/', async (req, res) => {
    try {
        if (!req.query.category) {
            const products = await Product.find({})
            return res.send(products)
        }

        let category = await Category.findOne({name: req.query.category})
        let productsArr = await Product.find({category: req.query.category})
        if (category.childrens.length > 0) {

            for (let i = 0; i < category.childrens.length; i++) {
                let arr = await Product.find({category: category.childrens[i].name})
                arr.forEach(prod => {
                    productsArr.push(prod)
                })
            }             
                
        }
        return res.send(productsArr)
        }
        catch(e) {
            console.log(e)
            
        }
    
})

router.post('/', auth, async (req, res) => {
    try {
        
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.json({message: 'Product has created!', _id: newProduct._id}).status(201)

    } catch(e) {
        res.json({message: 'Problem with the server'}).status(500)
        console.log(e)
    }
})

router.patch('/', auth, async (req, res) => {
    try {
        const {id, name, description, photoUrl, price, category} = req.body
        const product = await Product.findOneAndUpdate(id, {id, name, description, photoUrl, price, category})
        if (!product) res.json('Updating faild, please refresh and try again')

        else res.json({message: 'Product has updated!'}).status(201)

    } catch(e) {
        res.json({message: 'Problem with the server'}).status(500)
        console.log(e)
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({_id: req.headers.id})
        if (!product) res.json({message: 'Updating faild, please refresh and try again'})

        else res.json({message: 'Product has deleted!'}).status(201)

    } catch(e) {
        res.json({message: 'Problem with the server'}).status(500)
        console.log(e)
    }
})



module.exports = router