<template>
  <q-page padding>
   <h3 v-if="firstName">Hello logged page</h3>
    <h3 v-if="!firstName">You are not logged in</h3>
  </q-page>
</template>
<script setup>
import { response } from "express";

defineOptions({
  data() {
    return {
       name:'Home',
       firstName:null,
      fetchDateUrl : ({id}) => `http://localhost:3000/api/v1/users/${id}`,
    };
  },
  methods: {
  
  },
  async created() {
    await axios.get(this.fetchDateUrl({id:localStorage.getItem("id")}), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"), //to repeat every time
      }  
    })
    .then((response)=>{
       this.firstName=response.data.firstName
    });
    console.log(response);
  },
  
    
});

        
</script>