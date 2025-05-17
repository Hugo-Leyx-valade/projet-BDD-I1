const db = require('../db');
const bcrypt = require('bcrypt'); // Assurez-vous d'importer bcrypt

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM Users WHERE idUser = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(results[0]);
  });
};

exports.registerUser = (req, res) => {
  const { pseudo, email, password, idDepartement } = req.body;
  console.log(idDepartement);
  // Hacher le mot de passe
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
    }

    // Insérer l'utilisateur dans la base de données
    db.query('INSERT INTO Users (Pseudo, Email, Password, idDepartement, Role) VALUES (?, ?, ?, ?, 3)', [pseudo, email, hash, idDepartement], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'tié fada' });
      }
      db.query('SELECT * FROM Users WHERE Email like(?)', [email], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'tié fou' });
        }else{
          res.status(200).json({ message: 'Inscription réussie', user: results[0] });
        }
    });
  })
  });};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  db.query('SELECT * FROM Users WHERE Email like(?)', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    bcrypt.compare(password,results[0].password,(err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la vérification du mot de passe' });
      }
      if (result) {
        res.status(200).json({ message: 'Connexion réussie', user: results[0] });
      } else {
        console.log(password);
        res.status(401).json({ error: 'Mot de passe incorrect' });
      }
  })
  });
};

exports.updateUserById = (req, res) => {
  const userId = req.params.id;
  const { pseudo, email, idDepartement } = req.body;

  db.query(
    'UPDATE Users SET Pseudo = ?, Email = ?, idDepartement = ? WHERE idUser = ?',
    [pseudo, email, idDepartement, userId],
    (err, results) => {
      if (err) {
        console.log("Erreur MySQL :", err);
        return res.status(500).json({ error: 'Erreur MySQL' });
      }
      res.status(200).json({ message: 'Profil mis à jour' });
    }
  );
};

exports.reservationByIdUser = (req, res) => {
  const userId = req.params.id;
  db.query('Select Loue.idLocation, Jeu.Title, Loue.dateDepart, Loue.dateRetour, Ludotheque.Name from Loue Join Jeu on Jeu.id = Loue.Jeu_id Join Ludotheque on Ludotheque.idLudotheque = Loue.Ludotheque_idLudotheque where Loue.User_idUser = ? and Loue.dateRetour >= now();', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    res.json(results);
  });
};

exports.participationByIdUser = (req, res) => {
  const userId = req.params.id;
  db.query('Select * from Participe Join Evenement on Evenement.idEvenement = Participe.idEvenement join Ludotheque on Ludotheque.idLudotheque = Evenement.idLudotheque where Participe.idUser = ? and Evenement.Date >= now();', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur MySQL' });
    }
    res.json(results);
  });
};