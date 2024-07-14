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
        <div style="height: 400px"></div>

        <q-btn
          push
          key="loginbtn"
          color="black"
          label="LOGIN"
          to="/login"
          style="left: 20%; width: 30%; height: 40px"
        ></q-btn>
        <q-btn
          push
          key="registerbtn"
          color="green"
          label="REGISTER"
          to="/register"
          style="left: 25%; width: 30%; height: 40px"
        ></q-btn>
      </div>
    </transition-group>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const firstName = ref('');

// const fetchDateUrl = id => `http://localhost:3000/api/v1/users/${id}`;

// onMounted(async () => {
//   try {
//     const response = await axios.get(fetchDateUrl(localStorage.getItem('id')), {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//       },
//     });
//     firstName.value = response.data.firstName;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// });
</script>

<style>
.border-gray {
  border: 1px solid gray;
}
.id {
  background-color: redS;
}
.error {
  color: red;
  background-color: pink;
}
</style>
