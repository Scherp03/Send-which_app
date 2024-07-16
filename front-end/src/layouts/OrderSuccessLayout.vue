<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <body>
        <div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </body>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { route } from 'quasar/wrappers';

const confirm = ref(false);
const $q = useQuasar();
const router = useRouter();

const tab = ref(''); // Define the `tab` property
</script>

<style>
body {
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: auto;
  background: linear-gradient(
    315deg,
    rgb(39, 3, 198) 3%,
    rgba(60, 132, 206, 1) 38%,
    rgba(48, 238, 226, 1) 68%,
    rgb(165, 0, 248) 98%
  );
  animation: gradient 15s ease infinite;
  background-size: 400% 400%;
  background-attachment: fixed;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.wave {
  background: rgb(255 255 255 / 25%);
  border-radius: 1000% 1000% 0 0;
  position: fixed;
  width: 200%;
  height: 12em;
  animation: wave 10s -3s linear infinite;
  transform: translate3d(0, 0, 0);
  opacity: 0.8;
  bottom: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
}

.wave:nth-of-type(2) {
  bottom: -1.25em;
  animation: wave 18s linear reverse infinite;
  opacity: 0.8;
}

.wave:nth-of-type(3) {
  bottom: -2.5em;
  animation: wave 20s -1s reverse infinite;
  opacity: 0.9;
}

@keyframes wave {
  2% {
    transform: translateX(1);
  }

  25% {
    transform: translateX(-25%);
  }

  50% {
    transform: translateX(-50%);
  }

  75% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(1);
  }
}
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-toolbar {
  background-color: paleturquoise;
}
.q-footer {
  background-color: paleturquoise;
}
.q-tab {
  color: black;
}
.q-toolbar {
  color: black;
}
::-webkit-scrollbar {
  display: none;
}
</style>
