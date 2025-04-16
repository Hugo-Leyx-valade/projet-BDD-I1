<template>
  <div class="form-container">
    <h2>{{ isLogin ? 'Connexion' : 'Inscription' }}</h2>
    <form @submit.prevent="submitForm">
      <div v-if="!isLogin">
        <label for="pseudo">Pseudo:</label>
        <input type="text" id="pseudo" v-model="pseudo" required />
      </div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">Mot de passe:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">{{ isLogin ? 'Se connecter' : 'S\'inscrire' }}</button>
    </form>
    <button @click="toggleForm">{{ isLogin ? 'Pas encore inscrit ?' : 'Déjà inscrit ?' }}</button>
  </div>
</template>

<script>
import { loginUser } from '../auth';  // Importer notre méthode de login

export default {
  data() {
    return {
      isLogin: true,
      pseudo: '',
      email: '',
      password: '',
      users: [],
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    submitForm() {
      const url = this.isLogin ? 'http://localhost:3000/users/login' : 'http://localhost:3000/users/register';
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pseudo: this.pseudo,
          email: this.email,
          password: this.password
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Erreur :', data.error);
        } else {
          console.log('Succès :', data.message);
          console.log(data.user)
          const token = data.token;
          loginUser(token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = "/catalogue";
        }
      })
      .catch(error => console.error('Erreur :', error));
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px; /* Limite la largeur maximale pour les petits écrans */
  padding: 2rem;
  box-sizing: border-box;
  margin: 0 auto; /* Centre le conteneur horizontalement */
  background-color: #38220f;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

label {
  margin-top: 1rem;
  font-size: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

label, h2 {
  color: #38220f;
  font-weight: bolder;
}

h2 {
  color: #38220f;
}
</style>