const e = require('express');
const db = require('../db');
const bcrypt = require('bcrypt'); // Assurez-vous d'importer bcrypt

exports.getAllJeux = (req, res) => {
  db.query('SELECT * FROM Jeu', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    res.json(results);
  });
};

exports.getJeuById = (req, res) => {
  const userId = req.params.id;
  db.query('Call getJeuInfos(?);', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }
    res.json(results[0]);
  });
};


exports.getJeuByIdLudotheque = (req, res) => {
  const idLudotheque = req.params.idLudotheque;
  db.query('SELECT * FROM Jeu JOIN Stock ON Stock.idJeu = Jeu.id WHERE Stock.idLudotheque = ?;', [idLudotheque], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    res.json(results);
  });
}

exports.allReservationFaraGame = (req, res) => {
  const idJeu = req.params.idJeu;
  const idLudo = req.params.idLudotheque;
  db.query('select * from Loue JOIN Stock on Stock.idLudotheque = Loue.Ludotheque_idLudotheque where Ludotheque_idLudotheque = ? and idJeu = ?;', [idLudo,idJeu], (err, results) => {
    console.log(results);
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    console.log(results);
    res.json(results);
  });
}

exports.reserveJeu = (req, res) => {
  const { borrowDate, returnDate, userId, idJeu, idLudotheque } = req.body;

  console.log("Données reçues :", req.body);

  // Vérification des chevauchements de dates et du stock
  const checkAvailabilitySql = `
    CALL reserveJeu(?, ?, ?, ?, ?);
  `;

  db.query(
    checkAvailabilitySql,
    [idLudotheque, idJeu, borrowDate, borrowDate, returnDate, returnDate, borrowDate, returnDate],
    (err, results) => {
      if (err) {
        console.error("Erreur MySQL lors de la vérification des dates et du stock :", err);
        return res.status(500).json({ error: 'Erreur MySQL lors de la vérification des dates et du stock' });
      }

      // Vérifiez si le stock est épuisé
      if (results.length > 0 && results[0].totalReservations >= results[0].stockTotal) {
        console.log("Stock épuisé pour ce jeu à cette période.");
        return res.status(400).json({ error: 'Stock épuisé pour cette période' });
      }

      // Si le stock est disponible, insérer la réservation
      const insertReservationSql = `
        INSERT INTO Loue (dateDepart, dateRetour, User_idUser, Jeu_id, Ludotheque_idLudotheque)
        VALUES (?, ?, ?, ?, ?);
      `;
      console.log("je suis la pour la data",userId,idJeu);
      db.query(
        insertReservationSql,
        [borrowDate, returnDate, userId, idJeu, idLudotheque],
        (err, results) => {
          if (err) {
            console.error("Erreur MySQL lors de l'insertion de la réservation :", err);
            return res.status(500).json({ error: 'Erreur MySQL lors de l\'insertion de la réservation' });
          }

          console.log("Réservation réussie :", results);
          res.json({ message: 'Réservation réussie' });
        }
      );
    }
  );
};