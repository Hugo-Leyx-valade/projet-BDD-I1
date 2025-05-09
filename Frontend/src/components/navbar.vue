<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/catalogue">Accueil</router-link></li>
      <li><router-link to="/ludotheques">Ludotheques</router-link></li>
      <li><router-link to="/about">À propos</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li><router-link to="/profile">Mon profil</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>

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
</style>
