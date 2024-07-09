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
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const firstName = ref('');
const position = ref('')
const scrollAreaRef = ref(null)

const fetchDateUrl = id => `http://localhost:3000/api/v1/users/${id}`;



onMounted(async () => {
  try {
    const response = await axios.get(fetchDateUrl(localStorage.getItem('id')), {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    firstName.value = response.data.firstName;
    this.$root.$on('goAbout', this.go.bind(this, 'about'));
    this.$root.$on('goProjects', this.go.bind(this, 'projects'));
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});

 
</script>

<style>

</style>
