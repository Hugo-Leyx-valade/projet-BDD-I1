require('dotenv').config(); // Pour charger les variables .env
const mysql = require('mysql2/promise');

async function cleanExpiredArticles() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [results] = await connection.execute(
      'DELETE FROM articles WHERE date_expiration <= NOW()'
    );

    console.log(`${results.affectedRows} articles supprimés.`);
    await connection.end();
  } catch (error) {
    console.error('Erreur lors de la suppression des articles :', error);
  }
}

cleanExpiredArticles();
