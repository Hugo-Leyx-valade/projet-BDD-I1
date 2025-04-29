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

exports.reserveJeu = (req, res) => {
  const userId = req.params.id;
  db.query('', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }
    res.json(results);
  });
}

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
  const { borrowDate, returnDate, idUser, idJeu, idLudotheque } = req.body;
  console.log(req.body);
  // Vérification des chevauchements de dates
  db.query(
    `select * from Loue Join Jeu on Loue.Jeu_id = Jeu.id 
    Join Stock on Stock.idJeu= Jeu.id where Stock.idLudotheque = ? 
    AND Stock.idJeu = ? 
     AND (
       (dateDepart <= ? AND dateRetour >= ?) OR
       (dateDepart <= ? AND dateRetour >= ?) OR
       (dateDepart >= ? AND dateRetour <= ?)
     )`,
    [idLudotheque,idJeu, borrowDate, borrowDate, returnDate, returnDate, borrowDate, returnDate],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur MySQL lors de la vérification des dates' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 2});
      }

      // Si aucune réservation ne chevauche, insérer la nouvelle réservation
      db.query(
        `INSERT INTO Loue (dateDepart, dateRetour, User_idUser, Jeu_id) 
         VALUES (?, ?, ?, ?)`,
        [borrowDate, returnDate, idUser, idJeu],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Erreur MySQL lors de l\'insertion de la réservation' });
          }
          res.json({ message: 'Réservation réussie' });
        }
      );
    }
  );
};