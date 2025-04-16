<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/about">À propos</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px 0; /* Ajuste le padding pour centrer verticalement le contenu */
  text-align: center;
  width: 100%; /* Assurer que la largeur est de 100% */
  display: block; /* Vérifie que la navbar s'affiche comme un bloc */
}

.navbar ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex; /* Utilise Flexbox pour disposer les éléments en ligne */
  justify-content: center; /* Centre les éléments horizontalement */
}

.navbar li {
  margin: 0 100px; /* Ajoute de l'espace entre les éléments */
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 15px; /* Ajoute du padding pour rendre les liens cliquables plus facilement */
}

.navbar a:hover {
  background-color: #555; /* Ajoute un fond de couleur au survol */
  border-radius: 5px; /* Ajoute des coins arrondis au survol */
}
</style>
