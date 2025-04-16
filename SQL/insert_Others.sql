INSERT INTO User (idUser, Email, Pseudo, password, idDepartment, Role)
VALUES
(1, 'victor.dallon@efrei.net', 'Victor', 'abcd', 33, 1),
(2, 'hugo.leyxvalade@efrei.net', 'Hugo', 'abcd', 33, 2),
(2, 'leopold.billecocq@efrei.net', 'Leopold', 'abcd', 33, 3);

INSERT INTO Ludothèque (idLudothèque, Name, idDepartement, Ludothèquecol)
VALUES
(1, 'LudoParis', 75, 'PAR-LUDO'),
(2, 'LudoBordeaux', 33, 'BDX-LUDO');

INSERT INTO Stock (idLudothèque, idJeux, Stock)
VALUES
(1, 1, 5),
(1, 2, 10),
(2, 3, 2);

INSERT INTO Evenement (idEvenement, maxParticipant, Date, Evenementcol1)
VALUES
(1, '10', '2025-04-10', 'Tournois Echecs'),
(2, '20', '2025-04-15', 'Carcassonne à 8');

/* Création des Vue pour les fonctionnalités avancées du projet */ 

CREATE VIEW V_JeuxDisponibles AS
SELECT j.id, j.Primary, s.Stock, l.Name AS Ludotheque
FROM Jeu j
JOIN Stock s ON j.id = s.idJeux
JOIN Ludothèque l ON s.idLudothèque = l.idLudothèque
WHERE s.Stock > 0;

CREATE VIEW V_HistoriqueLocations AS
SELECT u.Pseudo, j.Primary AS Jeu, l.dateDepart, l.dateRetour
FROM Loue l
JOIN User u ON l.User_idUser = u.idUser
JOIN Jeu j ON l.Jeu_id = j.id;

CREATE VIEW V_ParticipantsEvenement AS
SELECT e.Evenementcol1, e.Date, u.Pseudo
FROM Participe p
JOIN Evenement e ON p.idEvenement = e.idEvenement
JOIN User u ON p.idUser = u.idUser;

/* Création des Index pour faciliter la recherche sur le site internet */ 

CREATE INDEX idx_user_email ON User(Email);

CREATE INDEX idx_jeu_nom ON Jeu(Primary);

CREATE INDEX idx_stock_jeu_ludo ON Stock(idJeux, idLudothèque);

/* Création des Triggers */ 

CREATE TRIGGER trg_reduce_stock
AFTER INSERT ON Loue
FOR EACH ROW
BEGIN
  UPDATE Stock
  SET Stock = Stock - 1
  WHERE idJeux = NEW.Jeu_id
    AND idLudothèque = (SELECT idLudothèque FROM Ludothèque LIMIT 1);
END;

CREATE TRIGGER trg_return_stock
AFTER UPDATE ON Loue
FOR EACH ROW
BEGIN
  IF NEW.dateRetour IS NOT NULL THEN
    UPDATE Stock
    SET Stock = Stock + 1
    WHERE idJeux = NEW.Jeu_id
      AND idLudothèque = (SELECT idLudothèque FROM Ludothèque LIMIT 1);
  END IF;
END;

CREATE TRIGGER trg_low_stock_alert
AFTER UPDATE ON Stock
FOR EACH ROW
BEGIN
  IF NEW.Stock < 2 THEN
    INSERT INTO Alertes (message) VALUES (CONCAT('Stock faible pour le jeu ID ', NEW.idJeux));
  END IF;
END;

/* Louer un jeu */

DELIMITER //

CREATE PROCEDURE LouerJeu(IN userId INT, IN jeuId INT, IN dateD DATE)
BEGIN
  INSERT INTO Loue (dateDepart, User_idUser, Jeu_id)
  VALUES (dateD, userId, jeuId);
END;
//

DELIMITER ;

/* Rendre un jeu */

DELIMITER //

CREATE PROCEDURE RetournerJeu(IN locId INT, IN dateR DATE)
BEGIN
  UPDATE Loue
  SET dateRetour = dateR
  WHERE idLocation = locId;
END;
//

DELIMITER ;

/* Ajouter un stock (partie admin ou ludo) */

DELIMITER //

CREATE PROCEDURE AjouterStock(IN ludId INT, IN jeuId INT, IN quantite INT)
BEGIN
  INSERT INTO Stock (idLudothèque, idJeux, Stock)
  VALUES (ludId, jeuId, quantite)
  ON DUPLICATE KEY UPDATE Stock = Stock + quantite;
END;
//

DELIMITER ;

