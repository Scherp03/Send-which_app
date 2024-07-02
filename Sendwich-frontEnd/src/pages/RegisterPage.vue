<template>
  <q-page padding>
    <q-form @submit.prevent="onsubmit">
      <q-input v-model="name" label="First Name" type="name" required />
      <q-input v-model="lastname" label="Last Name" type="name" required />
      <q-input v-model="username" label="username" type="name" required />
      <q-input v-model="email" label="Email" type="email" required />
      <q-input v-model="password" label="Password" type="password" required />
      <q-btn type="submit" label="Register" />
    </q-form>
  </q-page>
</template>
<script setup>
import axios from "axios";
defineOptions({
  data() {
    return {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async onsubmit() {
      const data = {
        name: this.name,
        lastname: this.lastname,
        username: this.username,
        email: this.email,
        password: this.password,
      };

      // axios
      //   .post(, data)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
});
</script>

<style></style>
