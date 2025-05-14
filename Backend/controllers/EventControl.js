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
    db.query('SELECT * FROM Evenement Join Jeu on Evenement.idJeu = Jeu.id WHERE idLudotheque = ? and Evenement.Date >= now();', [ludothequeId], (err, results) => {
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
    const { idEvenement, idUser } = req.body;

    // Vérifie si l'utilisateur est déjà inscrit à cet événement
    const checkSql = `
        SELECT * FROM Participe
        WHERE idUser = ? AND idEvenement = ?;
    `;

    db.query(checkSql, [idUser, idEvenement], (err, results) => {
        if (err) {
            console.error("Erreur MySQL lors de la vérification :", err);
            return res.status(500).json({ error: 'Erreur MySQL lors de la vérification' });
        }

        if (results.length > 0) {
            // L'utilisateur est déjà inscrit
            return res.status(400).json({ error: 'Utilisateur déjà inscrit à cet événement' });
        }

        // Vérifie si la date de l'événement est postérieure à aujourd'hui
        const dateCheckSql = `
            SELECT Date FROM Evenement
            WHERE idEvenement = ?;
        `;

        db.query(dateCheckSql, [idEvenement], (err, results) => {
            if (err) {
                console.error("Erreur MySQL lors de la vérification de la date :", err);
                return res.status(500).json({ error: 'Erreur MySQL lors de la vérification de la date' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Événement introuvable' });
            }

            const eventDate = new Date(results[0].Date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Réinitialise l'heure pour comparer uniquement les dates

            if (eventDate <= today) {
                return res.status(400).json({ error: 'Impossible de participer à un événement passé ou en cours' });
            }

            // Si la date est valide, insérez la participation
            const insertSql = `
                INSERT INTO Participe (idUser, idEvenement)
                VALUES (?, ?);
            `;

            db.query(insertSql, [idUser, idEvenement], (err, results) => {
                if (err) {
                    console.error("Erreur MySQL lors de l'insertion :", err);
                    return res.status(500).json({ error: 'Erreur MySQL lors de l\'insertion' });
                }

                res.json({ message: 'Participation ajoutée avec succès', results });
            });
        });
    });
};