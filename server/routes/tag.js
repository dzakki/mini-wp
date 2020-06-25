const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const TagController = require('../controllers/TagController')
router.get('/', TagController.getAll)
router.post('/', authentication,TagController.create)
router.post('/bulkinsert', authentication, TagController.bulkCreate)
router.get('/:id', TagController.get)
router.put('/:id', authentication ,TagController.update)
router.delete('/:id', authentication, TagController.delete)

module.exports = router