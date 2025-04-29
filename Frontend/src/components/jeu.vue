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
            <li v-for="store in activeLudo" :key="store.Name" > •  {{ store.Name }} ({{ store.idDepartement }}) - encore {{ store.Stock }} en stock ! <button id="reserve" :data-ludotheque-id="store.idLudotheque">Réserver !</button></li>
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
    min-height: 100%;
    min-width: 50%;
    background-color: #68775B;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 2rem;
  }
  
  .game-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .game-title {
    font-size: 2rem;
    color: #3f2d2d;
    margin-bottom: 1rem;
  }
  
  .game-year {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
  
  .game-explication {
    font-size: 1rem;
    color: #333;
    margin-bottom: 1.5rem;
    text-align: left;
  }
  
  .game-info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  
  .game-players,
  .game-time {
    margin-bottom: 1rem;
  }
  
  .game-players p,
  .game-time p {
    font-size: 1rem;
    color: #555;
  }
  
  .stores-container {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    text-align: center;
  }
  
  .stores-list {
    list-style-type: none;
    padding: 0;
  }
  
  .stores-list li {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  h3{
    color: #3f2d2d;
    font-weight:bolder ;
    margin-bottom:20px;
  }
  </style>
  