// routes/users.js
const express = require('express');
const router = express.Router();
const jeuController = require('../controllers/JeuxControl');

router.get('/', jeuController.getAllJeux);
router.get('/:id', jeuController.getJeuById);

module.exports = router;