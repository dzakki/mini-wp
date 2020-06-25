const router = require('express').Router()
const auth = require('./auth')

const user = require('./user')
const article = require('./article')
const tag = require('./tag')

router.use('/auth', auth)
router.use('/users', user)
router.use('/articles', article)
router.use('/tags', tag)

module.exports = router