const express = require('express')
const router = express.Router()
const auth = require('../middleware/AuthMiddleware')

const UserController = require('../controllers/UserController')

router
  .get('/home', auth, UserController.home)
  .get('/', auth, UserController.getUsers)
  .get('/:id', auth, UserController.getUser)
  .post('/', auth, UserController.saveUser)
  .put('/:id', auth, UserController.updateUser)
  .delete('/:id', auth, UserController.deleteUser)

module.exports = router