<template>
    <div class="ludotheque-page">
      <Navbar />
      <div class="ludo-details-container">
        <h2 class="ludo-title">🏛️ {{ ludotheque.Name }}</h2>
        <div class="ludo-details">
          <p><strong>Département :</strong> {{ ludotheque.idDepartement }}</p>
        </div>
      </div>
      <div id="createEvent" v-if="(user.Role === 2) && (parseInt(this.user.idUser) === parseInt(this.idLudotheque))">
            <button @click="console.log('triks')">Réserver un jeu</button>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Navbar from './navbar.vue';
  
  export default {
    name: 'LudothequePage',
    data() {
      return {
        ludotheque: {},
        user: JSON.parse(localStorage.getItem('entity')) || {},
        idLudotheque: this.$route.params.id,
      };
    },
    components: {
      Navbar
    },
    mounted() {
      const idLudotheque = this.$route.params.id;
      axios.get(`http://localhost:3000/ludotheque/${idLudotheque}`)
        .then(response => {
          this.ludotheque = response.data;
            console.log(this.ludotheque);
            console.log(parseInt(this.user.idUser) === parseInt(this.idLudotheque));
        })
        .catch(error => {
          console.error('Erreur lors du chargement des informations de la ludothèque', error);
        });
    }
  };
  </script>
  
  <style scoped>
  .ludotheque-page {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 2rem;
    text-align: center;
  }
  
  .ludo-details-container {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 600px;
    margin: 2rem auto;
  }
  
  .ludo-title {
    font-size: 2rem;
    color: #3f2d2d;
    margin-bottom: 1.5rem;
  }
  
  .ludo-details {
    text-align: left;
    font-size: 1.1rem;
    color: #555;
  }
  
  .ludo-details p {
    margin: 0.5rem 0;
  }
  
  .ludo-details strong {
    color: #3f2d2d;
  }
  </style>