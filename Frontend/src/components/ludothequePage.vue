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

    <div class="events-container">
      <h3>Événements :</h3>
      <div v-if="events.length === 0" class="no-events">
        Aucun événement n'est disponible pour cette ludothèque.
      </div>
      <div v-else class="event-cards">
        <div v-for="event in events" :key="event.idEvenement" class="event-card">
          <h4>{{ event.eventName }}</h4>
          <p><strong>Date :</strong> {{ formatDate(event.Date) }}</p>
          <p><strong>Places restantes :{{ numberOfParticipant(participants, event.id) }} / </strong> {{ event.maxParticipant }}</p>
          <p><strong>Jeu :</strong> {{ event.Title }}</p>
          <button
            v-if="user.Role === 3 && !alreadyParticiped.includes(event.idEvenement)"
            @click="goToParticipe(event.idEvenement, user.idUser)"
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
    } else {
      // Recharge les événements si on revient sur la même route
      this.fetchEvents(this.idLudotheque);
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

    // Récupère les événements associés à la ludothèque
    this.fetchEvents(idLudotheque);
    this.fetchParticipants(idLudotheque);
  },
  methods: {

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
      let count = 0;
      for (let i = 0; i < participants.length; i++) {
        if (participants[i].idEvent === idEvent) {
          count++;
        }
      }
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
</style>