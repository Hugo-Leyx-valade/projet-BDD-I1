const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventControl');

router.get('/', EventController.getAllEvents);
router.post('/create', EventController.postEventByIdLudo);
router.get('/ludotheque/:id', EventController.getEventByIdLudo); // Ajout de la route pour récupérer un événement par ID
router.get('/participants', EventController.getAllParticipants); // Ajout de la route pour récupérer un événement par ID
router.post('/participe', EventController.postParticipation); // Ajout de la route pour récupérer un événement par ID
module.exports = router;