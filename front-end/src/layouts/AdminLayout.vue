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

        <q-toolbar-title v-show="false"> Sendwhich App </q-toolbar-title>

        <body>
          <div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
          </div>
        </body>

        <q-btn
          flat
          name="Logout"
          color="red"
          label="Logout"
          @click="confirm = true"
        />
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="logout" color="primary" text-color="white" />
              <span class="q-ml-sm">Are you sure to log out?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                flat
                label="Logout"
                color="red"
                @click="logout"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <div>
          <q-avatar>
            <img src="../assets/Send-WhichLogo.svg" alt="" />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs v-model="tab" class="text-teal">
        <q-route-tab name="Sendwich" icon="home" label="Sendwich" to="/auth" />
        <q-route-tab
          name="Contacts"
          icon="contacts"
          label="Contact"
          to="/auth/contacts"
        />
        <q-route-tab
          name="Setting"
          icon="settings"
          label="Settings"
          to="/auth/settings"
        />
      </q-tabs>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" :breakpoint="767" :width="250" bordered>
      <q-list>
        <q-item-label header> Util links </q-item-label>

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
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { route } from 'quasar/wrappers';

const confirm = ref(false);
const $q = useQuasar();
const router = useRouter();

// onMounted(async () => {
//   try {
//     const storedToken = localStorage.getItem('token');
//     token.value = storedToken;
//   } catch (error) {
//     console.error('Error fetching token from localStorage:', error);
//   }
// });

const logout = async () => {
  try {
    localStorage.removeItem('token');
    router.push('/login');
    $q.notify({
      type: 'positive',
      message: 'You have logged out',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'An error occurred. Please try again later.',
    });
    console.error('Error:', error);
  }
};

const tab = ref(''); // Define the `tab` property
const linksList = [
  {
    title: 'SandWichApp',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/Send-which-app',
    icon: 'code',
    link: 'https://github.com/Scherp03/Send-which_app',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
body {
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: auto;
  background: linear-gradient(
    315deg,
    rgb(255, 0, 0) 3%,
    rgb(217, 255, 0) 38%,
    rgb(238, 103, 0) 68%,
    rgb(248, 0, 132) 98%
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
  background-color: lightcoral;
}
.q-footer {
  background-color: lightcoral;
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
