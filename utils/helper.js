const { options } = require("../routes")

module.exports = {
  filter: function(category, product, options){
    if(product.category=== category) return options.fn(this)
}}