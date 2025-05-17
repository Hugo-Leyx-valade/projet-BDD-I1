<template>
  <Navbar />
  <div class="profile-container">
    <div class="profile-card">
      <h2 v-if="userId.pseudo">{{ userId.pseudo }}</h2>
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

    <div class="profile-details">
      <div class="info-card reservations-container">
        <h3>Mes réservations</h3>
        <table v-if="reserv.length > 0" class="reservations-table">
          <thead>
            <tr>
              <th>Jeu</th>
              <th>Date d'emprunt</th>
              <th>Date de retour</th>
              <th>Ludothèque</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reserv" :key="reservation.id">
              <td>{{ reservation.Title }}</td>
              <td>{{ formatDate(reservation.dateDepart) }}</td>
              <td>{{ formatDate(reservation.dateRetour) }}</td>
              <td>{{ reservation.Name }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Aucune réservation à venir.</p>
      </div>

      <div class="info-card participation-container">
        <h3>Mes participations</h3>
        <table v-if="participe.length > 0" class="participation-table">
          <thead>
            <tr>
              <th>Nom event</th>
              <th>Date event</th>
              <th>Ludothèque</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="participations in participe" :key="participations.id">
              <td>{{ participations.eventName }}</td>
              <td>{{ formatDate(participations.Date) }}</td>
              <td>{{ participations.Name }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Aucune participation</p>
      </div>
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
      userId: JSON.parse(localStorage.getItem('entity')) || {},
      reserv: [],
      participe: [],
    };
  },
  mounted() {
    if (this.userId.Role === 2) {
      const ludothequeId = this.userId.idUser;
      this.$router.push(`/ludothequesPage/${ludothequeId}`);
      return;
    }
    this.getUserInfo(this.userId.idUser);
    this.getReservations(this.userId.idUser);
    this.getParticipations(this.userId.idUser);
  },

  methods: {
    getUserInfo(id) {
      axios.get(`http://localhost:3000/api/users/${id}`)
        .then(res => {
          console.log('Réponse API user :', res.data);
          const user = res.data;
          this.userId = {
            ...this.userId,
            pseudo: user.Pseudo,
            email: user.Email,
            idDepartement: user.idDepartement,
            idUser: user.idUser
          };
          this.profile = {
            pseudo: this.userId.Pseudo,
            email: this.userId.Email,
            idDepartement: this.userId.idDepartement
          };
        })
    .catch(() => alert("Erreur lors du chargement de l'utilisateur"));
    },

    getReservations(id) {
      axios.get(`http://localhost:3000/api/users/reservations/${id}`)
        .then(res => this.reserv = res.data)
        .catch(() => alert("Erreur lors du chargement des réservations"));
    },
    getParticipations(id) {
      axios.get(`http://localhost:3000/api/users/participations/${id}`)
        .then(res => this.participe = res.data)
        .catch(() => alert("Erreur lors du chargement des participations"));
    },
    saveProfile() {
      axios.put(`http://localhost:3000/api/users/${this.userId}`, this.profile)
        .then(() => alert("Modifications enregistrées"))
        .catch(() => alert("Erreur lors de la mise à jour"));
    },
    formatDate(date) {
      return new Date(date).toISOString().split("T")[0];
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
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 5%;
  gap: 2rem;
  background-color: #ece0d1;
  min-height: 100vh;
}

.profile-card {
  flex: 0.8;
  min-width: 350px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
}

.profile-details {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

h2, h3 {
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

.reservations-table,
.participation-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.reservations-table th,
.reservations-table td,
.participation-table th,
.participation-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.reservations-table th,
.participation-table th {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}

.reservations-table tr:nth-child(even),
.participation-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.reservations-table tr:hover,
.participation-table tr:hover {
  background-color: #f1f1f1;
}

.reservations-table td,
.participation-table td {
  color: #333;
  font-size: 0.9rem;
}
.info-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
}

.info-card h3 {
  color: #444;
  margin-bottom: 1rem;
  border-left: 5px solid #007bff;
  padding-left: 0.8rem;
}
</style>
