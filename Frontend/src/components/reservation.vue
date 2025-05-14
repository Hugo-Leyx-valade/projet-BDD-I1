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
            calendar-class="rounded"
          />
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
            Du {{ new Date(new Date(reservation.dateDepart).setDate(new Date(reservation.dateDepart).getDate() + 1)).toISOString().split('T')[0] }}
            au {{ new Date(new Date(reservation.dateRetour).setDate(new Date(reservation.dateRetour).getDate() + 1)).toISOString().split('T')[0] }}
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
      disabledRanges: [],
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
      return this.disabledRanges.some(
        (disabledDate) => disabledDate.toISOString().split('T')[0] === formattedDate
      );
    },
    updateDisabledRanges() {
      this.disabledRanges = [];
      const stockByDate = {};
      this.reservations.forEach((reservation) => {
        const startDate = new Date(reservation.dateDepart);
        const endDate = new Date(reservation.dateRetour);
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const formattedDate = currentDate.toISOString().split("T")[0];
          if (!stockByDate[formattedDate]) {
            stockByDate[formattedDate] = 1;
          } else {
            stockByDate[formattedDate]++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      Object.keys(stockByDate).forEach((date) => {
        const totalReservations = stockByDate[date];
        const stockTotal = this.reservations[0]?.Stock || 0;
        if (totalReservations >= stockTotal) {
          this.disabledRanges.push(new Date(date));
        }
      });
    },
    fetchReservations() {
      this.isLoading = true;
      axios
        .get(
          `http://localhost:3000/catalogue/${this.idJeu}/${this.idLudotheque}/reservation`
        )
        .then((response) => {
          this.reservations = response.data;
          this.updateDisabledRanges();
        })
        .catch((error) => {
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
          this.errorMessage = error.response.data.error;
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

<style>
.error-message {
  color: red;
}

h2 {
  text-align: center;
  color: #1af806;
  font-weight: bolder;
  margin-bottom: 2rem;
  font-size: 3rem;
}

label {
  font-size: 1.2rem;
  color: #504329;
}

.mx-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 100px;
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 5%;
}

.mx-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>

<style scoped>
button {
  background-color: #1af806;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

h3, ul {
  text-align: center; 
  color: #3f2d2d;
  margin-bottom: 2rem;
  font-size: 1rem;
}
</style>