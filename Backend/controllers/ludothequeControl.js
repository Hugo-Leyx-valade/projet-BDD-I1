const db = require('../db');
const bcrypt = require('bcrypt'); // Assurez-vous d'importer bcrypt

exports.createLudotheque = (req, res) => {
    const { pseudo, email, password, departement } = req.body;
  
    // 1. Hachage du mot de passe
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
      }
  
      // 2. Récupérer le dernier idUser pour en générer un nouveau
      db.query('SELECT MAX(idUser) AS maxId FROM Users', (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Erreur lors de la récupération du dernier ID' });
        }
  
        const newId = (results[0].maxId || 0) + 1;
  
        // 3. Insérer le nouvel utilisateur (avec rôle = 2 = ludothécaire)
        db.query(
          'INSERT INTO Users (idUser, Pseudo, Email, Password, idDepartement, Role) VALUES (?, ?, ?, ?, ?, ?)',
          [newId, pseudo, email, hash, departement, 2],
          (err) => {
            if (err) {
              return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
            }
  
            // 4. Insérer la ludothèque avec le même ID
            db.query(
              'INSERT INTO Ludotheque (idLudotheque, Name, Ludothequecol) VALUES (?, ?, ?)',
              [newId, pseudo, 'default'],
              (err) => {
                if (err) {
                  return res.status(500).json({ error: 'Erreur lors de la création de la ludothèque' });
                }
  
                // 5. Renvoyer l'utilisateur et la ludothèque créée
                db.query(
                  'SELECT * FROM Users JOIN Ludotheque ON Users.idUser = Ludotheque.idLudotheque WHERE Users.idUser = ?',
                  [newId],
                  (err, results) => {
                    if (err) {
                      return res.status(500).json({ error: 'Erreur lors de la récupération des données' });
                    }
  
                    res.status(200).json({ message: 'Ludothécaire et Ludothèque créés', user: results[0] });
                  }
                );
              }
            );
          }
        );
      });
    });
  };
  
  

exports.loginLudo = async (req, res) => {
    const { email, password } = req.body;
  
    // Vérifier si l'utilisateur existe
    db.query('SELECT * FROM Users JOIN Ludotheque on Ludotheque.idLudotheque = Users.idUser WHERE Users.Email like(?)', [email], (err, results) => {
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

  exports.allLudo = (req, res) => {
    db.query('Select * from Ludotheque join Users on idLudotheque = idUser; ', (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la connexion à la base de données' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Aucune ludothèque trouvée' });
      }
      res.status(200).json(results);
    });
  };
  
  exports.getLudoById = (req, res) => {
    const userId = req.params.id;
    db.query('SELECT idLudotheque, Name, idDepartement FROM Ludotheque join Users on idLudotheque = Users.idUser where idLudotheque = ?; ', [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la connexion à la base de données' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Ludothèque non trouvée' });
      }
      res.status(200).json(results[0]);
    });
  }
