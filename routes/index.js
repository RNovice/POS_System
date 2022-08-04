const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const edit = require('./modules/edit')

router.use('/', home)
router.use('/edit', edit)

module.exports = router