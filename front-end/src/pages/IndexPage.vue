<template>
  <q-page padding>
    <transition-group
      appear
      enter-active-class="animated fadeIn slower delay-0.5s repeat-2"
      leave-active-class="animated fadeOut"
    >
      <div class="fixed-center" style="width: 100%; text-align: center;">
        <!-- Image placeholder -->
        <img
          src="../assets/Send-Which_logo-removebg-preview.png"
          alt="App Logo"
          style="width: 350px; height: 200px; object-fit: contain; margin-bottom: 20px;"
        />

        <h1
          key="Enter message"
          style="font-weight: bolder; color: white; font-size: 3rem;"
        >
          WELCOME TO SEND-WHICH APP {{ firstName.charAt(0).toUpperCase() + firstName.slice(1) }}
        </h1>
        <div style="height: 100px"></div> <!-- Adjust height as needed -->

        <div style="display: flex; justify-content: center;">
          <q-btn
            push
            key="loginbtn"
            color="black"
            label="LOGIN"
            to="/login"
            style="width: 200px; height: 60px; font-size: 1.5rem; margin-right: 20px; margin-top: -40px;"
          ></q-btn>
          <q-btn
            push
            key="registerbtn"
            color="green"
            label="REGISTER"
            to="/register"
            style="width: 200px; height: 60px; font-size: 1.5rem; margin-top: -40px;"
          ></q-btn>
        </div>
      </div>
    </transition-group>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const firstName = ref('');
</script>

<style>
.border-gray {
  border: 1px solid gray;
}
.id {
  background-color: red;
}
.error {
  color: red;
  background-color: pink;
}
</style>
