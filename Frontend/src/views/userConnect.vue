<template>
  <div class="form-container">
    <h2 class="texte">{{ isLogin ? 'Connexion' : 'Inscription' }}</h2>
    <form @submit.prevent="submitForm">
      <div v-if="!isLogin">
        <label for="pseudo" class="texte">Pseudo:</label>
        <input type="text" class="ecriture" id="pseudo" v-model="pseudo" required />
      </div>
      <label for="email" class="texte">Email:</label>
      <input type="email" class="ecriture" id="email" v-model="email" required />
      <label for="password" class="texte">Mot de passe:</label>
      <input type="password" class="ecriture" id="password" v-model="password" required />
      <div v-if="!isLogin" id="departement-div">
      <label for="departement" class="texte">Département :</label>
      <input
        type="number"
        id="departement"
        class="ecriture"
        v-model="departement"
        min="1"
        max="101"
        required
      />
      <p v-if="departement && (departement < 1 || departement > 101)" style="color:red;">
        Le numéro de département doit être entre 1 et 101.
      </p>
    </div>
      <button type="submit">{{ isLogin ? 'Se connecter' : 'S\'inscrire' }}</button>
    </form>
    <button @click="toggleForm">{{ isLogin ? 'Pas encore inscrit ?' : 'Déjà inscrit ?' }}</button>
    <router-link to="/ludoGate">Vous êtes une ludothèque ? Alors c'est pas ici</router-link>
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
      departement:null,
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
          password: this.password,
          idDepartement:this.departement
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Erreur :', data.error);
        } else {
          console.log(data)
          console.log('Succès :', data.message);
          const token = data.token;
          loginUser(token);
          localStorage.setItem('entity', JSON.stringify(data.user));
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
  background-color: 	#68775b;
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

#departement{
  width: 60%;
}

.ecriture{
  background-color:	#bad5a4;
  box-shadow: none;
  border-width: 0cap;
  border-radius: 3%;
}

.texte{
  color: aliceblue;
}

#departement-div{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>