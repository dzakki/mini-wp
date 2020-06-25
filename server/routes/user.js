const router = require('express').Router()
const authentication = require('../middlewares/authentication')
router.use('/', authentication)

module.exports = router