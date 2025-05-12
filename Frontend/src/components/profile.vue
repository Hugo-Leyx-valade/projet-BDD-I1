<template>
  <Navbar />
  <div class="profile-container">
    <div class="profile-card">
      <h2>Mon Profil</h2>
      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label><i class="fas fa-user"></i> Pseudo :</label>
          <input v-model="profile.pseudo" required />
        </div>

        <div class="form-group">
          <label><i class="fas fa-envelope"></i> Email :</label>
          <input v-model="profile.email" type="email" required />
        </div>

        <div class="form-group">
          <label><i class="fas fa-map-marker-alt"></i> Département :</label>
          <input v-model="profile.idDepartement" required />
        </div>

        <button type="submit" class="btn-save">Enregistrer</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './navbar.vue';

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
    axios.get(`http://localhost:3000/api/users/${this.userId}`)
      .then(res => this.profile = res.data)
      .catch(() => alert("Erreur lors du chargement du profil"));
  },
  methods: {
    saveProfile() {
      axios.put(`http://localhost:3000/api/users/${this.userId}`, this.profile)
        .then(() => alert("Modifications enregistrées"))
        .catch(() => alert("Erreur lors de la mise à jour"));
    }
  },
  components: {
    Navbar,
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #ece0d1;
  margin-top: -100px;

}

.profile-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.btn-save {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-save:hover {
  background: #0056b3;
}

i {
  margin-right: 0.5rem;
  color: #007bff;
}
</style>