<template>
  <q-page padding>
    <h3 v-if="firstName">Hello {{ firstName.charAt(0).toUpperCase() + firstName.slice(1) }}  {{ lastName.charAt(0).toUpperCase() + lastName.slice(1) }} logged page</h3>
    <h3 v-if="!firstName">You are not logged in</h3>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const firstName = ref('');
const lastName = ref('');
const fetchDateUrl = id => `http://localhost:3000/api/v1/users/${id}`;

onMounted(async () => {
  try {
    const response = await axios.get(fetchDateUrl(localStorage.getItem('id')), {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    firstName.value = response.data.firstName;
    lastName.value = response.data.lastName;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});
</script>
