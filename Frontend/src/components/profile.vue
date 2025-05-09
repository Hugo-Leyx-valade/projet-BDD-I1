<template>
    <div class="profile">
      <h2>Mon profil</h2>
      <form @submit.prevent="saveProfile">
        <label>Pseudo :</label>
        <input v-model="profile.pseudo" required />
  
        <label>Email :</label>
        <input v-model="profile.email" type="email" required />
  
        <label>Département :</label>
        <input v-model="profile.idDepartement" required />
  
        <button type="submit">Enregistrer</button>
      </form>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        profile: {
          pseudo: '',
          email: '',
          idDepartement: ''
        },
        userId: localStorage.getItem('userId')
      };
    },
    mounted() {
      axios.get(`/api/users/${this.userId}`)
        .then(res => this.profile = res.data)
        .catch(() => alert("Erreur lors du chargement du profil"));
    },
    methods: {
      saveProfile() {
        axios.put(`/api/users/${this.userId}`, this.profile)
          .then(() => alert("Modifications enregistrées"))
          .catch(() => alert("Erreur lors de la mise à jour"));
      }
    }
  }
</script>
  
<style scoped>
  .profile {
    max-width: 500px;
    margin: 2rem auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-top: 1rem;
  }
  input {
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    margin-top: 1.5rem;
    padding: 0.7rem;
  }
</style>
  