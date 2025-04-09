const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Remplace par les infos de connexion de ton instance MySQL sur Aiven
const connection = mysql.createConnection({
  host: 'mysql-37e92356-bdd-b872.h.aivencloud.com',  // Exemple: 'your-db-host.aivencloud.com'
  user: 'avnadmin',  // Ton nom d'utilisateur
  password: 'AVNS_22SXqEsvWu94MrZlLJU',  // Ton mot de passe
  database: 'defaultdb',  // Le nom de ta base de données
  port: 21099,  // Port par défaut MySQL
  ssl: {
    ca: './ca.pem',  // Aiven fournit un certificat SSL
    rejectUnauthorized: false,
  }
});

// Teste la connexion MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.stack);
    return;
  }
  console.log('Connecté à MySQL sur Aiven !');
});

app.get('/', (req, res) => {
  res.send('Hello from backend connected to MySQL!');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

