const express = require('express')

const router = express.Router()

const Product = require('../../models/product')
const data = require('../../public/data/data.json')

router.get('/', (req, res) => {

  Product.find()
    .lean()
    .then(product => res.render('index', { product, category : data.category }))
    .catch(err => console.error(err))
})

router.post('/order', (req, res) => {

  Product.findOne({ name: req.body.name })
    .lean()
    .then(data => res.json(data))
    .catch(err => console.error(err))
})

module.exports = router