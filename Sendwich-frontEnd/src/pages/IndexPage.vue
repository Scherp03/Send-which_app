<template>
  <q-page padding >
    <input v-model="message" />
    <h2>{{message}}</h2>
    <button class="id" @click=login()>Sign in</button>
    <button class="id">Sign up</button>
  </q-page>
</template>

<script setup>
defineOptions({
  data(){
    return{
      message: "Welcome to Sendwich APP"
    }
  },

  methods:{
    login(){

    },
    signUp(){

    }
  }
});
</script>


<style>
.id{
  background-color: redS;
}
</style>