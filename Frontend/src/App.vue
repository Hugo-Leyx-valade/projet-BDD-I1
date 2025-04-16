<template>
  <div id="app">
    <!-- Barre latérale (au-dessus de la navbar) -->
    <header class="sidebar">
      <h1 class="app-name">Nom de l'Application</h1>
    </header>

    <!-- Navbar -->
    <Navbar />

    <!-- Contenu principal -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style scoped>
/* Reset de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Barre latérale - au-dessus de la navbar */
.sidebar {
  background-color: 	#68775b;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px; /* Hauteur de la barre latérale */
}

/* Nom de l'application centré dans la barre latérale */
.sidebar .app-name {
  color: white;
  font-size: 1.5rem;
  text-align: center;
  flex-grow: 1; /* Prend l'espace restant pour centrer le nom */
}

/* Navbar - Fixée en dessous de la barre latérale */
.navbar {
  background-color: 	#bad5a4;
  padding: 10px;
  text-align: center;
  z-index: 10;
  width: 100%;
  position: fixed;
  top: 60px; /* Place la navbar juste en dessous de la barre latérale */
  left: 0;
}

/* Liens dans la Navbar */
.navbar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.navbar li {
  margin: 0 20px;
}

.navbar a {
  color: #38220f;
  text-decoration: none;
  font-size: 18px;
}

.navbar a:hover {
  text-decoration: underline;
}

/* Contenu sous la navbar */
.content {
  margin-top: 120px; /* Décale le contenu pour qu'il ne soit pas masqué par la navbar */
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Styles généraux pour les titres */
h2 {
  text-align: center;
  color: #2e4a3c;
  margin-bottom: 2rem;
  font-size: 2rem;
}

/* Card container (catalogue) */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Style des cartes */
.card {
  background-color: #fff;
  border: 2px solid #8b5e3c;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  background-color: #f9f6f2;
}

.card h3 {
  margin: 0 0 1rem 0;
  color: #2e4a3c;
}

.card p {
  margin: 0.3rem 0;
  color: #3e3e3e;
}

#app {
  background-color: 	#ece0d1;
  border-color: #ece0d1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
