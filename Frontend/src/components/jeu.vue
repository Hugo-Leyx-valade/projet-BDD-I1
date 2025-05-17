<template>
      <Navbar />
      <div class="game-details-container" v-if="!isLoading">
        <div class="game-card">
          <h2 class="game-title">{{ game[0].Title }}</h2>
          <p class="game-year">Année de publication : {{ game[0].Yearpublished }}</p>
          <p class="game-explication">{{ game[0].Explication }}</p>
          <div class="game-info">
            <div class="game-players">
              <p>Nombre de joueurs : {{ game[0].Minplayers }} à {{ game[0].Maxplayers }}</p>
            </div>
            <div class="game-time">
              <p>Temps de jeu : {{ game[0].Playtime }} min</p>
              <p>Plage de temps de jeu : {{ game[0].Minplaytime }} - {{ game[0].Maxplaytime }} min</p>
            </div>
          </div>
        </div>
        <div class="stores-container">
          <h3>En stock à </h3>
          <ul class="stores-list">
            <li v-for="store in activeLudo" :key="store.Name">
              <div class="store-text">
                • {{ store.Name }} ({{ store.idDepartement }})
                <span class="badge-stock">x {{ store.Stock }}</span>
              </div>
              <button id="reserve" :data-ludotheque-id="store.idLudotheque">Réserver !</button>
            </li>
          </ul>
        </div>
      </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Navbar from './navbar.vue';
import router from '@/router';
  
  export default {
    name: 'GameDetails',
    data() {
      return {
        game: {},
        user: JSON.parse(localStorage.getItem('entity')) || {},  // Récupère les données utilisateur depuis localStorage
        isLoading: true, // par défaut à true
      };
    },
    props: {
      gameId: {
        type: Number,
        required: true,
      },
    },
    components: {
      Navbar,
    },
    mounted() {
  const gameId = this.$route.params.id;
  axios.get(`http://localhost:3000/catalogue/${gameId}`)
    .then(response => {
      this.game = response.data;
    })
    .catch(error => {
      console.error('Erreur lors du chargement des détails du jeu', error);
    })
    .finally(() => {
      this.isLoading = false;
    });
    document.addEventListener('click', this.handleReserveClick);
  },
    computed: {
    activeLudo() {
        console.log("test");
        console.log(this.game);
        if (this.game && Array.isArray(this.game)) {
          console.log(this.game.filter(game => game.idDepartement === this.user.idDepartement));
          return this.game.filter(game => game.idDepartement === this.user.idDepartement);
        }
      return [];  // Si pas de magasins ou pas de données
    },
  },
  methods:{
    handleReserveClick(event) {
      const reserveButton = event.target.closest('#reserve');
      if (reserveButton) {
        const gameId = this.$route.params.id; // ID du jeu
        const ludothequeId = reserveButton.getAttribute('data-ludotheque-id'); // ID de la ludothèque
        console.log("le numero de la ludo",ludothequeId);
        this.$router.push({
          path: `/reservation`,
          query: { idJeu: gameId, idLudotheque: ludothequeId },
        });
      }
    },
  },
  }

  </script>
  
  <style scoped>
.game-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 5%;
  background: linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: fadeIn 1s ease-in-out;
  border-radius: 20px;
  max-width: 1100px;
  margin: 2rem auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.game-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem 3rem;
  width: 100%;
  max-width: 700px;
  text-align: center;
  margin-bottom: 2rem;
}

.game-title {
  font-size: 2.5rem;
  color: #3f2d2d;
  margin-bottom: 1rem;
}

.game-year {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
}

.game-explication {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1.5rem;
  text-align: justify;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  margin-top: 1rem;
}

.game-info p {
  font-size: 1rem;
  color: #555;
}

.stores-container {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 700px;
  text-align: center;
}

.stores-list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}

.stores-list li {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
}

.stores-list button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.stores-list button:hover {
  background-color: #0056b3;
}

h3 {
  color: #3f2d2d;
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}
.stores-list li {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  gap: 1rem;
  flex-wrap: wrap;
}
.stores-list button {
  margin-left: 1rem; /* ✅ espace entre texte et bouton */
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}


.store-text {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
  color: #333;
}

.badge-stock {
  background-color: #bad5a4;
  color: #2e4824;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.85rem;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

  </style>
  