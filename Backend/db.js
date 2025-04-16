const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql-37e92356-bdd-b872.h.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_22SXqEsvWu94MrZlLJU',
  database: 'defaultdb',
  port: 21099,
  ssl: {
    ca: './ca.pem',
    rejectUnauthorized: false,
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.stack);
    return;
  }
  console.log('Connecté à MySQL sur Aiven !');
});

module.exports = connection;
