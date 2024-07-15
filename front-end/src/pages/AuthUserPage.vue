<template>
  <q-page padding>
    <transition-group
      appear
      enter-active-class="animated fadeIn slower delay-0.5s repeat-2"
      leave-active-class="animated fadeOut"
    >
      <div class="fixed-center-center" style="width: 100%">
        <h1
          class="fixed-center-center"
          key="Enter message"
          style="font-weight: bolder; color: white; font-size: 300%"
        >
          WELCOME TO SEND-WHICH APP 
          <span class="first-name">{{ firstName.charAt(0).toUpperCase() + firstName.slice(1) }}</span>
        </h1>
        <div class="arrow-container" @click="scrollToContent">
          <q-icon name="arrow_downward" size="55px" class="pulse-arrow" color="white" />
        </div>
      </div>
    </transition-group>

    <div ref="scrollContent" class="scroll-content hide-scrollbar">
      <h2>About Send-Which App</h2>
      <p>
        The Send-Which App is designed to provide an intuitive and efficient way to send and manage your packages. 
        With user-friendly features, real-time tracking, and seamless integration with multiple delivery services, 
        we ensure your packages are always on the right path. Our app is committed to enhancing your shipping experience 
        by offering reliable, fast, and secure service.
      </p>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

const firstName = ref('');
const scrollContent = ref(null);
const $q = useQuasar();

const fetchDateUrl = id => `http://localhost:3000/api/v1/users/${id}`;

const scrollToContent = () => {
  scrollContent.value.scrollIntoView({ behavior: 'smooth' });
};

onMounted(async () => {
  try {
    const response = await axios.get(fetchDateUrl(localStorage.getItem('id')), {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    firstName.value = response.data.firstName;
  } catch (error) {
    
    console.error('Error fetching user data:', error);
  }
});

onUnmounted(() => {
  console.log('Component is unmounted');
  // Any cleanup logic goes here
});
</script>

<style scoped>
.fixed-center-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Adjusted height to make space for the new section */
  text-align: center;
  flex-direction: column;
}

.arrow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px; /* Increased margin to create space above the arrow */
  cursor: pointer;
}

.pulse-arrow {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.scroll-content {
  min-height: 100vh; /* Ensure the section takes full viewport height */
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #333;
  background-color: white;
  margin-top: 60px; /* Added margin to create space between sections */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  text-align: center;
  overflow: auto; /* Ensure the content is scrollable */
}

/* Hiding the scrollbar for webkit-based browsers */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hiding the scrollbar for other browsers */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Styling for the first name */
.first-name {
  color: white;
  font-weight: bolder;
}
</style>
