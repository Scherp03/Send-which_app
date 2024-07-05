<template>
  <q-page padding>
   <h3 v-if="user">Hello logged page<h3>
    <h3 v-if="!user">You are not logged in</h3>
  </q-page>
</template>
<script setup>
defineOptions({
  data() {
    return {
       name:'Home',
       user:null,
    };
  },
  methods: {
  
  },
  
    
});

        
</script>