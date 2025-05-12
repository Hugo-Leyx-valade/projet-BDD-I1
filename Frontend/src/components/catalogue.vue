<template>
  <Navbar/>
  <div class="catalogue-container">
    <h2 class="title">🎲 Liste des jeux</h2>
    <div class="table-container">
      <table class="games-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Année</th>
            <th>Joueurs</th>
            <th>Temps de jeu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="jeu in jeux">
            <td><router-link :to="{ name: 'jeu', params: { id: jeu.id } }">{{ jeu.Title }}</router-link></td>
            <td>{{ jeu.Yearpublished }}</td>
            <td>{{ jeu.Minplayers }} à {{ jeu.Maxplayers }}</td>
            <td>{{ jeu.Minplaytime }} - {{ jeu.Maxplaytime }} min</td>
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
  name: 'Catalogue',
  data() {
    return {
      jeux: [],
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    axios.get('http://localhost:3000/catalogue')
      .then(response => {
        this.jeux = response.data;
        console.log(this.jeux);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des jeux', error);
      });
  }
};
</script>

<style scoped>
.catalogue-container {
  background-color: #00a2ff00;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center; /* Centre le contenu horizontalement */
}

.title {
  text-align: center;
  color: #3f2d2d;
  margin-bottom: 2rem;
  font-size: 3rem;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin: 0 0; /* Centre le conteneur de la table horizontalement */
  width: fit-content; /* Ajuste la largeur du conteneur en fonction du contenu */
}

.games-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fffefc;
  table-layout: auto; /* Permet aux colonnes de s'ajuster automatiquement */
}

.games-table th,
.games-table td {
  padding: 1rem; /* Augmente l'espace intérieur des cellules */
  text-align: center;
  border: 1px solid #d6c7b7;
  word-wrap: break-word; /* Permet de casser les mots longs */
  height: 2rem; /* Augmente la hauteur des lignes */
}

.games-table th {
  background-color: #e9d8c5;
  color: #3e2f1c;
}

.games-table tr:nth-child(even) {
  background-color: #f7f3ef;
}

.games-table tr:hover {
  background-color: #f0e9e1;
}

.games-table th,
.games-table td {
  min-width: 150px; /* Définit une largeur minimale pour les colonnes */
  color: #3e2f1c;
}
</style>
