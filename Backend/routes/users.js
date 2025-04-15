// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersControl');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
module.exports = router;

