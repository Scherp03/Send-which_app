<template>
  <q-page padding>
    <q-form @submit="onsubmit">
      <q-input v-model="email" label="Email" type="email" required />
      <q-input v-model="password" label="Password" type="password" required />
      <q-btn type="submit" label="Login" />
    </q-form>
  </q-page>
</template>
<script setup>

//import api from 'src/services/api';

defineOptions({
  data(){
    return{
    
    }
  },
  methods:{
   async onsubmit(){
  //      try {
  //   const response = await api.post('/auth/login', { email: email.value, password: password.value });
  //   localStorage.setItem('token', response.data.token);
  //   router.push('/');
  // } catch (error) {
  //   console.error(error);
  // }
    }
  }

 
});
</script>


<style>

</style>