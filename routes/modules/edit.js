const express = require('express')
const router = express.Router()
const fs = require('fs')

const Product = require('../../models/product')
const data = require('../../public/data/data.json')
const jsonReader = require('../../utils/jsonReader')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/img/icon') },
  filename: function (req, file, cb) { cb(null, file.originalname) }
})
const upload = multer({storage: storage})


router.get('/', (req, res) => {

  Product.find()
    .lean()
    .then(product => res.render('edit', { product, category : data.category }))
    .catch(error => {
      res.status(400).send({ message: 'This is an error!' })
      console.log(error)
    })
})


router.post('/', (req, res) => {

  Product.findByIdAndUpdate(req.body.id, {
    category : req.body.category,
    name : req.body.name,
    price : req.body.price,
    cost : req.body.cost,
    material : req.body.material.split(','),
    property : req.body.property.split(','),
    custom : req.body.custom})
  .then(() => res.redirect('/edit'))
  .catch(error => console.log(error))
})

router.get('/add', (req, res) => {

  res.render('addProduct', { data })
})

router.post('/add', (req, res) => {
  
  Product.create({
    category : req.body.category,
    name : req.body.name,
    price : req.body.price,
    cost : req.body.cost,
    material : req.body.material.split(','),
    property : req.body.property.split(','),
    custom : req.body.custom})
    .then(() => res.redirect('/edit'))
    .catch(error => {
      res.status(400).send({ message: 'This is an error!' })
      console.log(error)
    })
})

router.post('/delete', (req, res) => {

  Product.findById(req.body.id)
    .then(data => {
      let state = false
      if(data){
        state = true
        data.remove()
      }
      res.json(state)
    })
    .catch(error => {
      res.status(400).send({ message: 'This is an error!' })
      console.log(error)
    })
})

router.post('/adddata', upload.single('property'), (req, res) => {
  let updateData = ''

  switch (req.body.option){
    case 'category':
      updateData = req.body.category
      break;
    case 'material':
      updateData = req.body.material
      break;
    case 'property':
      updateData = '/img/icon/' + req.file.filename
      break;      
  }

  jsonReader('public/data/data.json', (err, thisData) => {
    if (err) console.log(err)
    else {
      thisData[req.body.option].push(updateData)
      fs.writeFile('public/data/data.json', JSON.stringify(thisData, null, 2), err => {
        if (err) console.log(err)
      })
    }
  })

  res.redirect('/edit')
})

router.get('/:id', (req, res) => {

  Product.findById(req.params.id)
    .lean()
    .then(product => {
      let property = {}
      let material = {}

      data.material.forEach( dataE => {
        material[dataE] = {name: dataE, check: ''}
        product.material.forEach( productE => {
          if (dataE === productE) material[dataE].check = 'checked'
        })
      })

      data.property.forEach( dataE => {
        property[dataE] = {src: dataE, check: ''}
        product.property.forEach( productE => {
          if (dataE === productE) property[dataE].check = 'checked'
        })
      })

      res.render('editProduct', { product, data, property, material })
    })
    .catch(error => {
      res.status(400).send({ message: 'This is an error!' })
      console.log(error)
    })
})

module.exports = router