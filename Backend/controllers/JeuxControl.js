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
  db.query('select Jeu.Title,Jeu.Description, Jeu.Yearpublished, Jeu.Minplayers, Jeu.Maxplayers, Jeu.Playtime, Jeu.Minplaytime, Jeu.Maxplaytime, Ludotheque.Name, Users.idDepartement, Ludotheque.ludothequecol, Stock.Stock from Jeu join Stock on Stock.idJeu = Jeu.id join Ludotheque on Ludotheque.idLudotheque = Stock.idLudotheque join Users on Users.idUser = Ludotheque.idLudotheque where Jeu.id = ?;', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }
    res.json(results);
  });
};
