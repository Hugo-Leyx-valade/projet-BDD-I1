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
  db.query('select Jeu.Title,Jeu.Description, Jeu.Yearpublished, Jeu.Minplayers, Jeu.Maxplayers, Jeu.Playtime, Jeu.Minplaytime, Jeu.Maxplaytime, Ludotheque.Name, Users.idDepartement, Ludotheque.idLudotheque, Stock.Stock from Jeu join Stock on Stock.idJeu = Jeu.id join Ludotheque on Ludotheque.idLudotheque = Stock.idLudotheque join Users on Users.idUser = Ludotheque.idLudotheque where Jeu.id = ?;', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }
    res.json(results);
  });
};


exports.allReservationFaraGame = (req, res) => {
  const idJeu = req.params.idJeu;
  const idLudo = req.params.idLudotheque;
  db.query('select * from Loue Join Jeu on Loue.Jeu_id = Jeu.id Join Stock on Stock.idJeu= Jeu.id where Stock.idLudotheque = ? AND Stock.idJeu = ?;', [idLudo,idJeu], (err, results) => {
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
    SELECT COUNT(*) AS totalReservations, Stock.Stock AS stockTotal
    FROM Loue
    JOIN Stock ON Loue.Jeu_id = Stock.idJeu
    WHERE Stock.idLudotheque = ?
      AND Stock.idJeu = ?
      AND (
        (dateDepart <= ? AND dateRetour >= ?) OR
        (dateDepart <= ? AND dateRetour >= ?) OR
        (dateDepart >= ? AND dateRetour <= ?)
      )
    GROUP BY Stock.Stock;
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
        INSERT INTO Loue (dateDepart, dateRetour, User_idUser, Jeu_id)
        VALUES (?, ?, ?, ?);
      `;
      console.log("je suis la pour la data",userId,idJeu);
      db.query(
        insertReservationSql,
        [borrowDate, returnDate, userId, idJeu],
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