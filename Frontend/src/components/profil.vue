<template>
    <Navbar/>
    <div class="profil-container">
        <h2 class="welcome">Bienvenue</h2>
        <p></p>
    </div>
</template>

<script>
import Navbar from './navbar.vue'

export default {
    name: 'Profil',
    components: {
        Navbar,
    },
}
</script>

<style scoped>
.profil-container {
  background-color: #00a2ff00;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center; /* Centre le contenu horizontalement */
  margin-top: -3%;
}

.welcome {
  text-align: center;
  color: #3f2d2d;
  margin-bottom: 2rem;
  font-size: 3rem;
}
</style>

