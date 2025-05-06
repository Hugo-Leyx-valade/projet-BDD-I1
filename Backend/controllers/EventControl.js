const e = require('express');
const db = require('../db');
const bcrypt = require('bcrypt'); // Assurez-vous d'importer bcrypt


exports.getAllEvents = (req, res) => {
    db.query('SELECT * FROM Evenement', (err, results) => {
        if (err) {
        return res.status(500).json({ error: 'Erreur MySQL' });
        }
        res.json(results);
    });
}


exports.postEventByIdLudo = (req, res) => {
    const { eventName, maxParticipants, eventDate, idLudotheque, idJeu } = req.body;

    // Requête SQL avec des paramètres préparés
    const sql = `
        INSERT INTO Evenement (eventName, maxParticipant, Date, idLudotheque, idJeu)
        VALUES (?, ?, ?, ?, ?);
    `;

    db.query(sql, [eventName, maxParticipants, eventDate, idLudotheque, idJeu], (err, results) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ error: 'Erreur MySQL' });
        }
        res.json({ message: 'Événement créé avec succès', results });
    });
};
