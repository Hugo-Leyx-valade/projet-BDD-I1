<template>
    <div class="game-details-container">
      <div class="game-card">
        <h2 class="game-title">{{ game.Title }}</h2>
        <p class="game-year">Année de publication : {{ game.Yearpublished }}</p>
        <p class="game-explication">{{ game.Explication }}</p>
        <div class="game-info">
          <div class="game-players">
            <p>Nombre de joueurs : {{ game.Minplayers }} à {{ game.Maxplayers }}</p>
          </div>
          <div class="game-time">
            <p>Temps de jeu : {{ game.Playtime }} min</p>
            <p>Plage de temps de jeu : {{ game.Minplaytime }} - {{ game.Maxplaytime }} min</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GameDetails',
    data() {
      return {
        game: {}
      };
    },
    mounted() {
      const gameId = this.$route.params.id;
      axios.get(`http://localhost:3000/catalogue/${gameId}`)
        .then(response => {
          this.game = response.data;
          console.log(JSON.stringify(this.game));
        })
        .catch(error => {
          console.error('Erreur lors du chargement des détails du jeu', error);
        });
    }
  };
  </script>
  
  <style scoped>
  .game-details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #fdfcf9;
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
  </style>
  