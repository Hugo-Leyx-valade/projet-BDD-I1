const express = require('express');
const router = express.Router();
const ludothequeController = require('../controllers/ludothequeControl');

router.post('/Create', ludothequeController.createLudotheque);
router.post('/Login', ludothequeController.loginLudo);

router.get('/', ludothequeController.allLudo);
router.get('/:id', ludothequeController.getLudoById);

module.exports = router;