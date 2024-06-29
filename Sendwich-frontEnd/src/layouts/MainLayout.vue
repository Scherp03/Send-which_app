<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title v-show="false">
          Quasar App
        </q-toolbar-title>
         <q-btn flat label="Home" to="/" />
        <q-btn flat label="Settings" to="/settings" />
        <q-btn flat name="Contacts"  label="Contact"  to="/contacts" />
        <q-avatar @click="goUserSettings"  color="red" text-color="white" icon="directions" />
        <div v-show="false">Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

     <q-footer >
        <q-tabs
        v-model="tab"
        class="text-teal"
      >
      
        <q-route-tab name="Sendwich" icon="home" label="Sendwich" to="/" />
        <q-route-tab name="Contacts" icon="contacts" label="Contact"  to="/contacts" />
        <q-route-tab name="Setting" icon="settings" label="Settings" to="/settings" />
      </q-tabs>

      </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout',
  data(){
    return{
      
    }
  }
})

const linksList = [
  {
    title: 'SandWichApp',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
   
  },
  {
    title: 'Github',
    caption: 'github.com/Send-which-app',
    icon: 'code',
    link: 'https://github.com/Scherp03/Send-which_app'
  },
  
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>

@media screen and (min-width: 768px){
  .q-footer{
    display: none;
  }
}
  

  .q-toolbar{
    background-color: green;
  }
  .q-footer{
       background-color: green;
  }
  .q-tab{
    color: black;
  }
</style>