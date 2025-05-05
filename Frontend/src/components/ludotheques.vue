<template>
  <Navbar/>
  <div class="ludotheques-container">
    <h2 class="title">🏛️ Liste des Ludothèques</h2>

    <div class="cards-container">
      <div 
        v-for="ludo in ludotheques" 
        :key="ludo.idLudotheque" 
        class="ludo-card" 
        @click="redirectToLudo(ludo.idLudotheque)"
      >
        <h3 class="ludo-name">{{ ludo.Name }}</h3>
        <p class="ludo-departement">Département: {{ ludo.idDepartement }}</p>
        <p class="ludo-code">Code: {{ ludo.Ludothequecol }}</p>
      </div>
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
  },
  methods: {
    redirectToLudo(id) {
      this.$router.push(`/ludothequesPage/${id}`);
    }
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

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.ludo-card {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 250px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ludo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.ludo-name {
  font-size: 1.5rem;
  color: #3f2d2d;
  margin-bottom: 0.5rem;
}

.ludo-departement,
.ludo-code {
  font-size: 1rem;
  color: #555;
}
</style>