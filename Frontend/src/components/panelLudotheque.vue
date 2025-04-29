<template>
    <Navbar />
    <div class="game-details-container">
      <div class="game-card">
        <h2 class="game-title">{{ ludo.Pseudo }}</h2>
        <p class="game-year">Année de publication : {{ ludo.Email }}</p>
        <p class="game-explication">{{ ludo.idDepartement }}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from './navbar.vue';

export default {
  name: 'GameDetails',
  data() {
    return {
      game: {},
      ludo: JSON.parse(localStorage.getItem('entity')) || {},  // Récupère les données utilisateur depuis localStorage
      isLoading: true, // par défaut à true
    };
  },
  components: {
    Navbar,
  },
  mounted(){
    console.log(ludo);
  
}
};
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
