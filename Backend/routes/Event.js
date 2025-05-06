const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventControl');

router.get('/', EventController.getAllEvents);
router.post('/create', EventController.postEventByIdLudo);
module.exports = router;