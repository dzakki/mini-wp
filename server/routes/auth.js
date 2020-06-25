const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.get('/', (req, res) => {
  res.send('auth')
})

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/github/:code', AuthController.github)

module.exports = router