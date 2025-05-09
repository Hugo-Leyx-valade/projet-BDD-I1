<template>
    <div class="event-creation-container">
      <h2>Créer un Événement</h2>
      <form @submit.prevent="submitEvent" @submit="goToLudotheque(this.$route.params.id)">
        <div class="form-group">
          <label for="eventName">Nom de l'Événement :</label>
          <input
            type="text"
            id="eventName"
            v-model="eventName"
            placeholder="Nom de l'événement"
            required
          />
        </div>
        <div class="form-group">
          <label for="maxParticipants">Nombre maximum de participants :</label>
          <input
            type="number"
            id="maxParticipants"
            v-model="maxParticipants"
            placeholder="Nombre maximum"
            min="1"
            required
          />
        </div>
        <div class="form-group">
          <label for="eventDate">Date de l'Événement :</label>
          <DatePicker
            v-model="eventDate"
            v-model:value="selectedDate"
            :format="'YYYY-MM-DD'"
            :placeholder="'Sélectionnez une date'"
            @change="handleDateChange"
            />
        </div>
        <div class="form-group">
          <label for="game">Jeu :</label>
          <select id="game" v-model="selectedGame" required>
            <option v-for="game in games" :key="game.id" :value="game.id" style="color: black;">
              {{ game.Title }}
            </option>
          </select>
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Création en cours...' : 'Créer l\'événement' }}
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import DatePicker from "vue-datepicker-next";
  import "vue-datepicker-next/index.css";
  
  export default {
    name: "EventCreation",
    components: {
      DatePicker,
    },
    data() {
      return {
        eventName: "",
        maxParticipants: null,
        eventDate: null,
        selectedGame: null,
        games: [], // Liste des jeux disponibles
        isLoading: false,
        errorMessage: "",
        successMessage: "",
      };
    },
    methods: {
      goToLudotheque(id) {
      window.location.href = `/ludothequesPage/${id}`;
    },

      fetchGames() {
        // Récupère la liste des jeux disponibles
        axios
          .get("http://localhost:3000/catalogue/") // Remplacez par l'URL de votre API
          .then((response) => {
            this.games = response.data;
          })
          .catch((error) => {
            console.error("Erreur lors du chargement des jeux :", error);
            this.errorMessage = "Impossible de charger la liste des jeux.";
          });
      },
      submitEvent() {
        this.isLoading = true;
        this.errorMessage = "";
        this.successMessage = "";
  
        const eventData = {
          name: this.eventName,
          maxParticipants: this.maxParticipants,
          date: this.eventDate,
          ludothequeId: this.$route.params.id, // ID de la ludothèque
          gameId: this.selectedGame,
        };
        
        console.log("Données de l'événement :", eventData, this.selectedGame);
        axios
          .post("http://localhost:3000/Event/create", eventData) // Remplacez par l'URL de votre API
          .then(() => {
            this.successMessage = "Événement créé avec succès !";
            this.resetForm();
          })
          .catch((error) => {
            console.error("Erreur lors de la création de l'événement :", error);
            this.errorMessage = "Une erreur est survenue lors de la création de l'événement.";
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
      resetForm() {
        this.eventName = "";
        this.maxParticipants = null;
        this.eventDate = null;
        this.selectedGame = null;
      },
      handleDateChange(date) {
        console.log("Date changée :", date);
        // Formate la date en 'YYYY-MM-DD' sans décalage UTC
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
        const day = String(date.getDate()).padStart(2, "0");
        this.eventDate = `${year}-${month}-${day}`;
    },
    },
    mounted() {
      this.fetchGames();
    },
  };
  </script>
  
  <style scoped>
  .event-creation-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  select,
  button {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  .success-message {
    color: green;
    margin-top: 10px;
  }
  </style>