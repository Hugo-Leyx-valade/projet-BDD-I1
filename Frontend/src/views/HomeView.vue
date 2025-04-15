<template>
  <div>
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
export default {
  data() {
    return {
      isLogin: true,
      pseudo: '',
      email: '',
      password: '',
      user: [],
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
          this.user = JSON.stringify(data.user);
        }
      })
      .catch(error => console.error('Erreur :', error));
    }
  }
};
</script>
