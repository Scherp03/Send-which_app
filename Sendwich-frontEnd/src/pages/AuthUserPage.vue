<template>
  <q-page padding>
    <transition-group
      appear
      enter-active-class="animated fadeIn slower delay-0.5s repeat-2"
      leave-active-class="animated fadeOut"
    >
      <div class="fixed-center" style="width: 100%">
        <h1
          class="fixed-center"
          key="Enter message"
          style="font-weight: bolder; color: white; font-size: 300%"
        >
          WELCOME TO SEND-WHICH APP {{ firstName.charAt(0).toUpperCase() + firstName.slice(1) }}
        </h1>
      </div>
    </transition-group>
    <div class="arrow-container" @click="scrollDown">
      <q-icon name="arrow_downward" size="50px" color="white" />
    </div>
    <div ref="scrollArea" class="scroll-content">
      <!-- Your content goes here -->
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

const firstName = ref('');
const scrollAreaRef = ref(null);
const $q = useQuasar();

const fetchDateUrl = id => `http://localhost:3000/api/v1/users/${id}`;

const scrollDown = () => {
  scrollAreaRef.value.scrollIntoView({ behavior: 'smooth' });
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
    $q.notify({
      type: 'negative',
      message: 'Error fetching user data',
    });
    console.error('Error fetching user data:', error);
  }
});
</script>
<style scoped>
.fixed-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  flex-direction: column;
}

.arrow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
}

.scroll-content {
  height: 100vh; /* Adjust this height based on your layout */
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #333;
}
</style>
