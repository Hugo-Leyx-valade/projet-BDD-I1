<template>
    <Navbar/>
    <div class="about-container">
        <h2 class="title">💡 À propos</h2>
        <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et erat vitae enim tincidunt tincidunt. Integer nec malesuada erat. In at sapien vel justo sollicitudin scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
Vivamus laoreet, elit nec varius porttitor, nulla nunc dapibus erat, in cursus nulla odio id magna. Sed ac efficitur sapien, vitae posuere nunc. Curabitur imperdiet lorem eu turpis tincidunt, vel porta neque hendrerit.
Maecenas nec sagittis ex. Vestibulum non ultrices tortor. Morbi in urna vel sem porttitor dignissim a in justo. Praesent pulvinar nibh id ante tincidunt, at dapibus neque tincidunt.
        </p>
    </div>
</template>

<script>
import Navbar from './navbar.vue'

export default {
    name: 'A propos',
    components: {
        Navbar,
    },
}
</script>

<style scoped>
.about-container {
  background-color: #00a2ff00;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center; /* Centre le contenu horizontalement */
  margin-top: -3%;
}

.title {
  text-align: center;
  color: #3f2d2d;
  margin-bottom: 2rem;
  font-size: 3rem;
}
</style>