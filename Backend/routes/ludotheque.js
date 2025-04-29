const express = require('express');
const router = express.Router();
const ludothequeController = require('../controllers/ludothequeControl');

router.post('/Create', ludothequeController.createLudotheque);
router.post('/Login', ludothequeController.loginLudo);

module.exports = router;