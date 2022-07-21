const Product = require('../product')
const seed = require('../seeds/seed.json')

const db = require('../../config/mongoose')

const fs = require('fs')

let data = {
    "category": [],
    "material": [],
    "property": []
  }

for(const d in data){
  seed.results.forEach(seedInfo => {
    if(d === 'category') data[d].push(seedInfo[d])
    else data[d].push(...seedInfo[d])
    data[d] = data[d].filter((item, index, arr)=> {
      return arr.indexOf(item) === index;
    })
  })
}

fs.writeFile('./public/data/data.json', JSON.stringify(data, null, 2), err => {
  if(err) console.log(err)
  else console.log('localdata done')
})

db.once('open', () => {
  seed.results.forEach(info => {
    Product.create(info)
  })

  console.log('database done')
})