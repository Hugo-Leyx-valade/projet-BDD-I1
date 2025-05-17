<template>
  <Navbar />
  <div class="contact-container">
    <div class="header-section">
      <h2 class="title">📞 Contactez-nous</h2>
      <p class="subtitle">
        Une question, un retour ou simplement envie d’échanger ? Notre équipe est à votre écoute !
      </p>
    </div>

    <div class="contact-content">
      <div class="contact-card">
        <form class="contact-form">
          <input type="text" placeholder="Votre nom" required />
          <input type="email" placeholder="Votre email" required />
          <textarea placeholder="Votre message" rows="5" required></textarea>
          <button type="submit">Envoyer le message</button>
        </form>
      </div>

      <div class="info-card">
        <h3>📍 Nos coordonnées</h3>
        <p>📧 <strong>Email</strong> : contact@ludohub.com</p>
        <p>📱 <strong>Téléphone</strong> : +33 1 23 45 67 89</p>
        <p>🏢 <strong>Adresse</strong> : 123 Avenue Yvan Guifo, 75008 Paris</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './navbar.vue';

export default {
  name: 'Contact',
  components: {
    Navbar,
  },
};
</script>

<style scoped>
  .contact-container {
  padding: 2rem 5%;
  background: linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%);
  animation: fadeIn 1.2s ease-in-out;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 1200px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #444;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}
.subtitle::after {
  content: '';
  display: block;
  width: 50px;
  height: 4px;
  background: #bad5a4;
  margin: 1rem auto;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.contact-card, .info-card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  flex: 1 1 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.contact-card:hover,
.info-card:hover {
  transform: translateY(-5px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-form button:hover {
  background-color: #0056b3;
}

.info-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.info-card p {
  color: #444;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
    align-items: center;
  }

  .contact-card, .info-card {
    width: 90%;
  }
}
@media (max-width: 480px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .contact-form input,
  .contact-form textarea {
    font-size: 0.9rem;
  }

  .contact-form button {
    font-size: 0.9rem;
  }
}
  .info-card h3 {
    font-size: 1.2rem;
  }

  .info-card p {
    font-size: 0.9rem;
  }

  .contact-card h3 {
    font-size: 1.2rem;
  }

  .contact-card p {
    font-size: 0.9rem;
  }
  .contact-card button {
    font-size: 0.9rem;
  }
  .contact-card input,
  .contact-card textarea {
    font-size: 0.9rem;
  }

</style>