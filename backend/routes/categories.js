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
        
        const categories = await Category.find({})
        res.json(categories)

    } catch(e) {
        res.json({message: 'Problem with the server'}).status(500)
        console.log(e)
    }
})


router.post('/', auth, async (req, res) => {
    try {
        const exict = await Category.findOne({name: req.body.name})
        if (exict) {
            return res.json({message: 'There is a category with the same name'})
        }
        let newCategory = new Category({name: req.body.name, fathers: []})
        
      
        await newCategory.save()
        if (req.body.father) {
            newCategory.fathers.push({name: req.body.father})
            const father = await Category.findOne({name: req.body.father})
            father.childrens.push({name: req.body.name})
            await father.save()
        }

        await newCategory.save()
        const categories = await Category.find({})
        res.json({message: newCategory.name + ' saved succeessfully', categories})

    } catch(e) {
        console.log(e)
    }
})

router.delete('/', auth, async (req, res) => {
    console.log(req.query);
    try {
        
        await Category.deleteOne({'name': req.query.name}); 
        const categories = await Category.find({});
        for (let i = 0; i < categories.length; i++) {
            for (let j = 0; j < categories[i].childrens.length; j++) {
                if (categories[i].childrens[j].name === req.query.name)
                categories[i].childrens.splice(j, 1)
            }
        }
        res.json({message: req.query.name + ' deleted succeessfully'})

    } catch(e) {
        console.log(e)
    }
})


module.exports = router