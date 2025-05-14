// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersControl');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUserById);
router.get('/reservations/:id', userController.reservationByIdUser);
router.get('/participations/:id', userController.participationByIdUser);

module.exports = router;

