<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-input v-model="email" label="Email" type="email" required />
      <q-input v-model="password" label="Password" type="password" required />
      <q-btn type="submit" label="Login" />
    </q-form>
  </q-page>
</template>
<script setup>
defineOptions({
  data(){
    return{
     
    }
  },

 
});
</script>


<style>

</style>