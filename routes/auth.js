const router = require('express').Router()
const AuthController = require("../controllers/AuthController")
const UserController = require('../controllers/UserController')
// const auth = require('../middleware/AuthMiddleware')

router.post('/signup', UserController.saveUser)
router.post('/login', AuthController.login)

module.exports = router
