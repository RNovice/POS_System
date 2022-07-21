const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchma = new Schema ({
  category : {type: String, require: true},
  name : {type: String, required: true},
  price : {type: Number, required: true},
  cost : {type: Number, required: true},
  material : {type: [String], required: true},
  property : {type: [String], required: false},
  custom : {type: [String], required: false},
})

module.exports = mongoose.model('product', productSchma)