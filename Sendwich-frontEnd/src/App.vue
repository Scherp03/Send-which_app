<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";

defineOptions({
  name: 'App'
});
onMounted( () =>{
  document.title='Send-Which App'
})
</script>
