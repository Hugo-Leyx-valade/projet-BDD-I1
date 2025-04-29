<template>
    <Navbar/>
    <div class="contact-container">
        <h2 class="title">📞 Contact</h2>
        <p class="subtitle">N'hésitez pas à nous contacter via le formulaire ci-dessous ou par nos coordonnées.</p>

        <form class="contact-form">
            <input type="text" placeholder="Votre nom" required />
            <input type="email" placeholder="Votre email" required />
            <textarea placeholder="Votre message" rows="5" required></textarea>
            <button type="submit">Envoyer</button>
        </form>

        <div class="contact-info">
            <br>
            <p>📧 Email : contact@ludohub.com</p>
            <p>📍 Adresse : 123 Avenue Yvan Guifo, 75008 Paris</p>
            <p>📱 Téléphone : +33 1 23 45 67 89</p>
        </div>
    </div>
</template>

<script>
import Navbar from './navbar.vue'

export default {
    name: 'Contact',
    components: {
        Navbar,
    },
}
</script>

<style scoped>
.contact-container {
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
.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #555;
}

.contact-info {
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #333;
}

.contact-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.contact-form button {
  background-color: #00a2ff;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-form button:hover {
  background-color: #007acc;
}
</style>