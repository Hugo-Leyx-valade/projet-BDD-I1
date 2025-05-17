<template>
  <router-view :key="$route.fullPath"></router-view>
  <div class="ludotheque-page">
    <Navbar />
    <div class="ludo-details-container">
      <h2 class="ludo-title">🏛️ {{ ludotheque.Name }}</h2>
      <div class="ludo-details">
        <p><strong>Département :</strong> {{ ludotheque.idDepartement }}</p>
      </div>
    </div>
    <div id="createEvent" v-if="(user.Role === 2) && (parseInt(this.user.idUser) === parseInt(this.idLudotheque))">
      <button @click="goToEventCreation(this.idLudotheque)">Créer un événement</button>
    </div>

  <!-- BOUTON AJOUTER UN JEU -->
    <div v-if="user.Role === 2 && parseInt(user.idUser) === parseInt(idLudotheque)" class="add-game-btn-container">
      <button @click="showAddGameForm = !showAddGameForm" class="add-game-btn">
        {{ showAddGameForm ? 'Fermer' : 'Ajouter un jeu à la ludothèque' }}
      </button>
    </div>

    <!-- FORMULAIRE AJOUT DE JEU AVEC FADE -->
    <transition name="fade">
      <form v-if="showAddGameForm" class="add-game-form" @submit.prevent="addGameToLudo">
        <label for="selectGame">Jeu :</label>
        <select v-model="selectedGameId" id="selectGame" required>
          <option value="" disabled>Choisir un jeu</option>
          <option v-for="game in allGames" :key="game.id" :value="game.id">
            {{ game.Title }}
          </option>
        </select>
        <label for="stock">Stock :</label>
        <input type="number" id="stock" v-model.number="stockToAdd" min="1" required />
        <button type="submit" class="add-game-submit-btn">Ajouter</button>
      </form>
    </transition>

    <div class="games-container" v-if="!isLoading">
  <h3 style="color: grey;">Jeux :</h3>
  <div v-if="games.length === 0" class="no-events">
    Aucun Jeu n'est disponible dans cette ludothèque.
  </div>
  <div v-else>
    <div class="table-container">
      <table class="games-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Année</th>
            <th>Joueurs</th>
            <th>Temps de jeu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="jeu in games" :key="jeu.id">
            <td><router-link :to="{ name: 'jeu', params: { id: jeu.id } }">{{ jeu.Title }}</router-link></td>
            <td>{{ jeu.Yearpublished }}</td>
            <td>{{ jeu.Minplayers }} à {{ jeu.Maxplayers }}</td>
            <td>{{ jeu.Minplaytime }} - {{ jeu.Maxplaytime }} min</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    <div class="events-container">
      <h3 style="color: grey;">Événements :</h3>
      <div v-if="events.length === 0" class="no-events">
        Aucun événement n'est disponible pour cette ludothèque.
      </div>
      <div v-else class="event-cards">
        <div v-for="event in events" :key="event.idEvenement" class="event-card">
          <h4>{{ event.eventName }}</h4>
          <p><strong>Date :</strong> {{ formatDate(event.Date) }}</p>
          <p><strong>Places restantes :{{ numberOfParticipant(participants, event.idEvenement) }} / </strong> {{ event.maxParticipant }}</p>
          <p><strong>Jeu :</strong> {{ event.Title }}</p>
          <button
            v-if="user.Role === 3 && !alreadyParticiped.includes(event.idEvenement) && numberOfParticipant(participants, event.idEvenement) <= event.maxParticipant"
            @click="goToParticipe(event.idEvenement, user.idUser),refreshPage()"
            class="participate-button"
          >
            Participer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./navbar.vue";

export default {
  name: "LudothequePage",
  data() {
    return {
      ludotheque: {},
      user: JSON.parse(localStorage.getItem("entity")) || {},
      idLudotheque: this.$route.params.id,
      events: [], // Liste des événements
      participants:[],
      alreadyParticiped:[],
      games: [], // Liste des jeux
      isLoading: true, // Indicateur de chargement
      showAddGameForm: false,
      allGames: [],
      selectedGameId: "",
      stockToAdd: 1,
    };
  },
  components: {
    Navbar,
  },

  watch: {
  $route(to, from) {
    if (to.params.id !== from.params.id) {
      this.idLudotheque = to.params.id;
      this.fetchEvents(this.idLudotheque);
      window.location.reload();
    } else {
      // Recharge les événements si on revient sur la même route
      this.fetchEvents(this.idLudotheque);
      window.location.reload();
    }
  },
  participants(newParticipants) {
    if (newParticipants.length > 0) {
      this.alreadyParticiped = this.generateAlreadyParticipedArray(this.user.idUser);
      console.log("alreadyParticiped mis à jour :", this.alreadyParticiped);
    }
  },
},
  mounted() {
    const idLudotheque = this.$route.params.id;
    axios
      .get(`http://localhost:3000/ludotheque/${idLudotheque}`)
      .then((response) => {
        this.ludotheque = response.data;
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des informations de la ludothèque",
          error
        );
      });

      axios
      .get(`http://localhost:3000/catalogue/ludotheque/${idLudotheque}`)
      .then((response) => {
        this.games = response.data;
        this.isLoading = false; // Fin du chargement
        console.log("Jeux récupérés :", this.games);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des jeux :", error);
      });

    // Récupère les événements associés à la ludothèque
    this.fetchEvents(idLudotheque);
    this.fetchParticipants(idLudotheque);

    axios
      .get("http://localhost:3000/catalogue/")
      .then((response) => {
        this.allGames = response.data;
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de tous les jeux :", error);
      });
  },
  methods: {

    addGameToLudo() {
      if (!this.selectedGameId || !this.stockToAdd) return;
      axios
        .post("http://localhost:3000/ludotheque/addToLudo", {
          idLudotheque: this.idLudotheque,
          idJeu: this.selectedGameId,
          stock: this.stockToAdd,
        })
        .then(() => {
          this.showAddGameForm = false;
          this.selectedGameId = "";
          this.stockToAdd = 1;
          this.$nextTick(() => this.fetchGames());
        })
        .catch((error) => {
          alert("Erreur lors de l'ajout du jeu : " + (error.response?.data?.error || error.message));
        });
    },
    fetchGames() {
      axios
        .get(`http://localhost:3000/catalogue/ludotheque/${this.idLudotheque}`)
        .then((response) => {
          this.games = response.data;
        })
        .catch((error) => {
          console.error("Erreur lors du rafraîchissement des jeux :", error);
        });
    },

    generateAlreadyParticipedArray(idUser) {
      const alreadyParticiped = [];
      console.log("ID de l'utilisateur :", idUser);
      console.log("Tableau des participants dans la fonctions :", this.participants);
      for (let i = 0; i < this.participants.length; i++) {
        if (this.participants[i].idUser === idUser) {
          alreadyParticiped.push(this.participants[i].idEvenement);
        }
      }
      console.log("Array des participations déjà existantes :", alreadyParticiped);
      return alreadyParticiped;
    },

      refreshPage() {
      this.$router.go(0); // Recharge la page actuelle
    },

    goToParticipe(idEvenement, idUser) {
      const data = {
        idEvenement: idEvenement,
        idUser: idUser,
      };
      axios
        .post("http://localhost:3000/Event/participe", data)
        .then((response) => {
          console.log("Participation réussie :", response.data);
          this.alreadyParticiped.push(idEvenement);
        })
        .catch((error) => {
          console.error("Erreur lors de la participation :", error);
          alert(error.response.data.error);
        });
    },
    numberOfParticipant(participants, idEvent) {
      console.log("je suis la :", idEvent);
      let count = 0;
      for (let i = 0; i < participants.length; i++) {
        console.log("je suis la aussi :", participants[i].idEvenement);
        if (participants[i].idEvenement === idEvent) {
          count++;
          console.log("petrushka", count );
        }
      }
      console.log("Nombre de participants pour l'événement", idEvent, ":", count);
      return count;
    }, 
    formatDate(date) {
        return new Date(date).toISOString().split("T")[0];
      },
    goToEventCreation(id) {
      this.$router.push(`/EventCreation/${id}`);
    },
    fetchEvents(idLudotheque) {
      axios
        .get(`http://localhost:3000/Event/ludotheque/${idLudotheque}`)
        .then((response) => {
          this.events = response.data;
          console.log("Événements récupérés :", this.events);  
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des événements :", error);
        });
    },
    fetchParticipants(idLudotheque) {
  console.log("ID de la ludothèque :", idLudotheque);

  const data = {
    idLudotheque: idLudotheque,
  };

  axios
    .get(`http://localhost:3000/Event/participants`, { params: data })
    .then((response) => {
      if (response.data && Array.isArray(response.data)) {
        this.participants = response.data;
        console.log("Participants récupérés :", this.participants);
      } else {
        console.warn("Réponse inattendue pour les participants :", response.data);
        this.participants = [];
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des participants :", error);
    });
    },
  },
};
</script>

<style scoped>
.ludotheque-page {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
  text-align: center;
}

.ludo-details-container {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
}

.ludo-title {
  font-size: 2rem;
  color: #3f2d2d;
  margin-bottom: 1.5rem;
}

.ludo-details {
  text-align: left;
  font-size: 1.1rem;
  color: #555;
}

.ludo-details p {
  margin: 0.5rem 0;
}

.ludo-details strong {
  color: #3f2d2d;
}

#createEvent button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

#createEvent button:hover {
  background-color: #0056b3;
}

.events-container {
  margin-top: 2rem;
}

.event-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.event-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 300px;
  text-align: left;
}

.event-card h4 {
  font-size: 1.5rem;
  color: #3f2d2d;
  margin-bottom: 0.5rem;
}

.event-card p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #555;
}

.no-events {
  font-size: 1.2rem;
  color: #888;
  margin-top: 1rem;
}

.participate-button {
  background-color: #28a745; /* Vert pour indiquer une action positive */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.participate-button:hover {
  background-color: #218838; /* Couleur légèrement plus foncée au survol */
  transform: scale(1.05); /* Légère mise en avant au survol */
}

.participate-button:active {
  background-color: #1e7e34; /* Couleur encore plus foncée lors du clic */
  transform: scale(0.95); /* Légère réduction lors du clic */
}

.participate-button:disabled {
  background-color: #ccc; /* Couleur grise pour un bouton désactivé */
  cursor: not-allowed;
}

.games-table {
  width: 100%;
  border-collapse:collapse;
  margin: 1rem 0;
  font-size: 1rem;
  text-align: left;
  border-radius: 60%;
}

.games-table th,
.games-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  color: #333;
}

.games-table th {
  background-color: #f4f4f4;
  color: #333;
  font-weight: bold;
}

.games-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.games-table tr:hover {
  background-color: #f1f1f1;
}

.games-table td button {
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
}

.games-table td button:hover {
  background-color: #218838;
}

.add-game-btn-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.add-game-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.add-game-btn:hover {
  background-color: #0056b3;
}

.add-game-form {
  max-width: 400px;
  margin: 1rem auto 2rem auto;
  padding: 1.5rem 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.5s;
}

.add-game-form label {
  font-weight: bold;
  color: #333;
}

.add-game-form select,
.add-game-form input[type="number"] {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.add-game-submit-btn {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.3s;
}

.add-game-submit-btn:hover {
  background-color: #218838;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px);}
  to { opacity: 1; transform: translateY(0);}
}
</style>  