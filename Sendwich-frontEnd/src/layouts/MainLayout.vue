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

        <q-toolbar-title >
          SendwhichApp
        </q-toolbar-title>

        <div>
           <q-avatar>
      <img src="https://cdn.quasar.dev/img/avatar.png">
    </q-avatar>
        </div>
      </q-toolbar>
    </q-header>
  
  
      <q-footer >
        <q-toolbar >
           <q-tabs class="absolute-center" >
        <q-route-tab name="Sendwhich" icon="home" label="Sendwhich" to='/' />
        <q-route-tab name="Settings" icon="settings" label="settings" to='/settings' />
        <q-route-tab name="movies" icon="movie" label="Movies" to='/contacts' />
      </q-tabs>

        </q-toolbar>
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
          Essential Links
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
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Sendwhich',
    caption: 'Sendwhich',
    icon: 'home',
    to:'/'
  },
  {
    title: 'Github',
    caption: 'github.com/SendwhichApp',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
 
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<style>
.q-page{
  background-color: red;
}
@media screen and (min-width: 768px){
  q-footer{
    display: none;
  }
}
</style>