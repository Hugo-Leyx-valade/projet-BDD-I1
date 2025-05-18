<template>
  <Navbar />
  <div class="about-container">
    <div class="header-section">
      <h2 class="title">À propos du projet</h2>
      <p class="subtitle">
        Nous sommes quatre étudiants en troisième année d’école d’ingénieur à Efrei Paris. Ce projet a été réalisé dans le cadre de notre formation pour concevoir une plateforme intuitive de gestion des ludothèques, mêlant développement web, base de données et expérience utilisateur.
      </p>
    </div>

    <div class="team-section">
      <h3 class="team-title">Notre équipe</h3>
      <div class="team-cards">
        <div class="team-card" v-for="member in team" :key="member.name">
          <img :src="member.image" alt="Photo" class="member-img" />
          <h4>{{ member.name }}</h4>
          <p>{{ member.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from './navbar.vue';

export default {
  name: 'A propos',
  components: {
    Navbar,
  },
  data() {
    return {
      team: [
        {
          name: 'Victor',
          role: 'Développeur & CIL (Cyber Sécurité, Infrastructure et Logiciel)', 
          image: 'https://avatars.githubusercontent.com/u/115532904?v=4',
        },
        {
          name: 'Hugo',
          role: 'Développeur & LSI (Logiciel de Système d’Information)',
          image: 'https://i.pinimg.com/236x/64/09/56/6409561a54a28b57a29150db52388a51.jpg',
        },
        {
          name: 'Léopold',
          role: 'Développeur & CIL (Cyber Sécurité, Infrastructure et Logiciel)',
          image: 'https://preview.redd.it/anyone-got-tips-for-carl-v0-b8okhjk19hrd1.png?width=1200&format=png&auto=webp&s=ba9c248632112fdb83a0e98c4955d3fe4acd47bc',
        },
        {
          name: 'Steeve',
          role: 'Développeur & CIL (Cyber Sécurité, Infrastructure et Logiciel)',
          image: 'https://i.pinimg.com/736x/8d/e8/72/8de87212e16e9f6e02dc8e24aa1a1baa.jpg',
        },
      ],
    };
  },
};
</script>


<style scoped>
.about-container {
  padding: 2rem 5%;
  background: linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%);
  animation: fadeIn 1.5s ease-in-out;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 1200px;
}

.header-section {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  color: #444;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #444;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}
.subtitle::after {
  content: '';
  display: block;
  width: 50px;
  height: 4px;
  background: #bad5a4;
  margin: 1rem auto;
}

.team-section {
  text-align: center;
}

.team-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
}

.team-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.team-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  width: 240px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
}

.member-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
