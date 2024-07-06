<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-form
        @submit.prevent="onsubmit"
        class="fixed-center"
        style="max-width: 300px"
      >
        <transition-group appear enter-active-class="animated fadeIn delay-1s">
          <div
            key="login-text"
            style="
              color: white;
              font-size: 15px;
              font-family: Verdana;
              font-weight: bold;
            "
          >
            ENTER CREDENTIALS TO LOGIN
          </div>
          <br key="br1"/>
          <br key="br2"/>
          <div style="max-width: 300px" key="username-input">
            <q-input
              color="black"
              bg-color="white"
              outlined
              v-model="username"
              label="Username"
              type="text"
              required
            />
            <br key="br3"/>
          </div>
          <div style="max-width: 300px" key="password-input">
            <q-input
              color="black"
              bg-color="white"
              outlined
              v-model="password"
              label="Password"
              type="password"
              required
            />
          </div>
          <br key="br4"/>
          <br key="br5"/>
          <br key="br6"/>
          <div key="login-btn">
            <q-btn
              style="max-width: 300px; height: 10%"
              push
              class="fixed-bottom"
              color="black"
              bg-color="white"
              type="submit"
              label="LogIn"
            />
          </div>
        </transition-group>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const $q = useQuasar();
const router = useRouter();

const onsubmit = async () => {
  try {
    const data = {
      username: username.value,
      password: password.value,
    };

    console.log(data);

    const response = await axios.post(`http://localhost:3000/api/v1/auth/login`, data);

    if (response.data.success) {
      $q.notify({
        type: 'positive',
        message: response.data.message,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.id);
      router.push('/auth');
    } else {
      $q.notify({
        type: 'negative',
        message: response.data.message,
      });
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'An error occurred. Please try again later.',
    });
    console.error('Error:', error);
  }
};
</script>

<style></style>
