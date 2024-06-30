<template>
   <q-page padding>
    <q-form @submit="onSubmit">
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
defineOptions({
  data(){
    return{
     
    }
  },
  methods:{
    
  }

 
});
</script>


<style>

</style>