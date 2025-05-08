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
    const { name, maxParticipants, date, ludothequeId, gameId } = req.body;

    // Requête SQL avec des paramètres préparés
    const sql = `
        INSERT INTO Evenement (eventName, maxParticipant, Date, idLudotheque, idJeu)
        VALUES (?, ?, ?, ?, ?);
    `;

    db.query(sql, [name, maxParticipants, date, ludothequeId, gameId], (err, results) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ error: 'Erreur MySQL' });
        }
        res.json({ message: 'Événement créé avec succès', results });
    });
};

exports.getEventByIdLudo = (req, res) => {
    const ludothequeId = req.params.id;
    db.query('SELECT * FROM Evenement Join Jeu on Evenement.idJeu = Jeu.id WHERE idLudotheque = ?', [ludothequeId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la connexion à la base de données' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Aucun événement trouvé pour cette ludothèque' });
      }
      res.status(200).json(results);
    });
  }

exports.getAllParticipants = (req, res) => {
    const idLudotheque = req.query.idLudotheque; // Récupérer l'idLudotheque depuis la requête
    const idUser = req.query.idUser; // Récupérer l'idUser depuis la requête
    console.log(idLudotheque);
    db.query('SELECT idUser, Participe.idEvenement, Evenement.idLudotheque FROM Participe join Evenement on Participe.idEvenement = Evenement.idEvenement join Ludotheque on Evenement.idLudotheque = Ludotheque.idLudotheque where Ludotheque.idLudotheque = ?',[idLudotheque,idUser], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la connexion à la base de données' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Aucun participant trouvé' });
        }
        res.status(200).json(results);
    });
    }

exports.postParticipation = (req, res) => {
    const { idEvenement, idUser} = req.body;
    // Requête SQL avec des paramètres préparés
    const sql = `
        INSERT INTO Participe (idUser, idEvenement)
        VALUES (?, ?);
    `;

    db.query(sql, [idUser, idEvenement], (err, results) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ error: 'Erreur MySQL' });
        }
        res.json({ message: 'Participation ajoutée avec succès', results });
    });
}