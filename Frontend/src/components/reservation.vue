<template>
    <div class="reservation-form-container">
      <Navbar />
      <div class="form-card">
        <h2>Réserver un jeu</h2>
        <form @submit.prevent="submitReservation">
          <div class="form-group">
            <label for="dateRange">Sélectionnez une période :</label>
            <date-picker
                v-model:value="selectedDate"
                :disabled-date="isDateDisabled"
                range
                type="daterange"
                :format="'YYYY-MM-DD'"
                :placeholder="['Date d\'emprunt', 'Date de retour']"
                @change="handleDateChange"
            ></date-picker>
          </div>
          <button type="submit" :disabled="!isFormValid || isLoading">
            {{ isLoading ? 'Réservation en cours...' : 'Réserver' }}
          </button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
        <div class="reserved-dates">
          <h3>Dates déjà réservées :</h3>
          <ul>
            <li v-for="reservation in reservations" :key="reservation.idLocation">
              Du {{ formatDate(reservation.dateDepart) }} au {{ formatDate(reservation.dateRetour) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Navbar from "./navbar.vue";
  import DatePicker from "vue-datepicker-next";
  import "vue-datepicker-next/index.css";
  
  export default {
    name: "ReservationForm",
    components: {
      Navbar,
      DatePicker,
    },
    data() {
      return {
        dateRange: [],
        reservations: [],
        today: new Date().toISOString().split("T")[0],
        idJeu: null,
        idLudotheque: null,
        isLoading: false,
        errorMessage: "",
        disabledRanges: [
      ]
      };
    },
    computed: {
      isFormValid() {
        return (
          this.dateRange.length === 2 &&
          this.dateRange[0] <= this.dateRange[1] &&
          !this.isDateDisabled(this.dateRange[0]) &&
          !this.isDateDisabled(this.dateRange[1])
          
        );
      },
    },
    methods: {

        handleDateChange(dates) {
      if (dates.length === 2 && !this.isDateDisabled(dates[0]) && !this.isDateDisabled(dates[1])) {
        this.dateRange = dates;
      } else {
        this.dateRange = [];
        this.errorMessage = "La date sélectionnée est invalide. Veuillez choisir une autre date.";
      }
    },
        isDateDisabled(date) {
      const formattedDate = date.toISOString().split('T')[0];
      // Vérifie si la date est dans l'une des plages désactivées
      const isInDisabledRange = this.reservations.some(range => {
        console.log("Date formatée :", range.dateDepart, range.dateRetour);
        return formattedDate >= range.dateDepart && formattedDate <= range.dateRetour;
      });
      console.log(`Date ${formattedDate} désactivée :`, isInDisabledRange);
      return isInDisabledRange;
    },
      fetchReservations() {
        this.isLoading = true;
        axios
          .get(
            `http://localhost:3000/catalogue/${this.idJeu}/${this.idLudotheque}/reservation`
          )
          .then((response) => {
            this.reservations = response.data;
            console.log("Réservations chargées :", this.reservations);
          })
          .catch((error) => {
            console.error("Erreur lors du chargement des réservations", error);
            this.errorMessage = "Erreur lors du chargement des réservations.";
          })
          .finally(() => {
            this.isLoading = false;
          });
      },

      formatDate(date) {
        return new Date(date).toISOString().split("T")[0];
      },
      submitReservation() {
        this.isLoading = true;
        this.errorMessage = "";
        console.log("Fetching reservations for game ID:", this.idJeu, "and library ID:", this.idLudotheque);
        console.log(this.dateRange);
        const reservationData = {
          borrowDate: this.formatDate(this.dateRange[0]),
          returnDate: this.formatDate(this.dateRange[1]),
          userId: String(JSON.parse(localStorage.getItem("entity")).idUser),
          idJeu: this.idJeu,
          idLudotheque: this.idLudotheque,
        };
        axios
          .post(`http://localhost:3000/catalogue/reservation`, reservationData)
          .then(() => {
            alert("Réservation effectuée avec succès !");
            this.fetchReservations();
          })
          .catch((error) => {
            if (error.response && error.response.data.error === 2) {
              this.errorMessage = "Erreur : le Jeu est déjà réservé à cette date !";
            } else {
              console.error("Erreur lors de la réservation :", error);
              this.errorMessage = "Erreur lors de la réservation.";
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
    },
    mounted() {
      this.idJeu = this.$route.query.idJeu;
      this.idLudotheque = this.$route.query.idLudotheque;
      this.fetchReservations();
    },
  };
  </script>
  
  <style scoped>
  .error-message {
    color: red;
  }
  /* Ajoutez vos styles ici */
  </style>
  