const express = require('express');
const cors = require('cors');
const compression = require('compression');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Autoriser uniquement cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: 'Content-Type,Authorization', // Autoriser uniquement ces en-têtes
  credentials: true // Autoriser les informations d'identification
}));

// Middleware pour lire du JSON dans les requêtes
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});

app.use(compression());


// ------------------------  ROUTES  ----------------------------------

// router test server connecté 
app.get('/', (req, res) => {
  res.send('🚀 Serveur Node.js avec MySQL connecté !');
});

// Routes pour les users (redirige vers routes/users.js) 
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Routes pour les users (redirige vers routes/users.js) 
const jeuRoutes = require('./routes/jeux');
app.use('/catalogue', jeuRoutes);

const ludoRoutes = require('./routes/ludotheque');
app.use('/ludotheque', ludoRoutes);

const eventRoutes = require('./routes/Event');
app.use('/Event', eventRoutes);

app.get("/")

