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

router.get('/stock', (req, res) => {
  
  res.render('stockout', { material : data.material })
})

router.get('/color', (req, res) => {
  
  res.render('customColor', { material : data.material })
})

router.post('/order', (req, res) => {

  Product.findOne({ name: req.body.name })
    .lean()
    .then(data => res.json(data))
    .catch(err => console.error(err))
})

router.post('/homePageStockout', (req, res) => {

  Product.find()
    .lean()
    .then(products => {
      let inStock = []
      let stockout = req.body.stockout

      if (!Array.isArray(req.body.stockout)) stockout = [req.body.stockout]
      products.filter(product => {
        if (product.material.some(material => stockout.includes(material))){
          inStock.push(product.name)
        }
      })
      res.json(inStock)
    })
    .catch(err => console.error(err))
})

module.exports = router