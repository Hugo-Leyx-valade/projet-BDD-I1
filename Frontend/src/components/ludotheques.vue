<template>
    <Navbar/>
    <div class="ludotheques-container">
      <h2 class="title">🏛️ Liste des Ludothèques</h2>
  
      <div class="table-container">
        <table class="ludos-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Département</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ludo in ludotheques" :key="ludo.idLudotheque">
              <td>{{ ludo.Name }}</td>
              <td>{{ ludo.idDepartement }}</td>
              <td>{{ ludo.Ludothequecol }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Navbar from './navbar.vue';
  
  export default {
    name: 'Ludotheques',
    data() {
      return {
        ludotheques: []
      };
    },
    components: {
      Navbar
    },
    mounted() {
      axios.get('http://localhost:3000/ludotheque/') // Crée un endpoint pour retourner les ludothèques
        .then(response => {
          this.ludotheques = response.data;
          console.log(this.ludotheques);
        })
        .catch(error => {
          console.error('Erreur lors du chargement des ludothèques', error);
        });
    }
  };
  </script>
  
  <style scoped>
  .ludotheques-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    padding-top: 2rem;
  }
  
  .title {
    color: #3f2d2d;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
  
  .table-container {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin: 0 auto;
    width: fit-content;
  }
  
  .ludos-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
  }
  
  .ludos-table th,
  .ludos-table td {
    padding: 1rem;
    text-align: center;
    border: 1px solid #ccc;
    min-width: 150px;
    color: #333;
  }
  
  .ludos-table th {
    background-color: #e0d4c2;
    color: #2e2e2e;
  }
  
  .ludos-table tr:nth-child(even) {
    background-color: #f6f6f6;
  }
  </style>