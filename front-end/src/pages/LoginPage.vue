<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
          </q-card-section>
          <q-card-section>
            <q-input
              dense
              outlined
              v-model="username"
              label="Username"
            ></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Password"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="dark"
              rounded
              size="md"
              label="Sign in"
              no-caps
              class="full-width"
              @click="onsubmit"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Don't have an account yet?
              <a
                href="#/register"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Sign up.</a
              >
            </div>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8 q-mb-md">or sign in with</div>
            <q-btn
              class="social-btn q-mb-sm"
              color="white"
              text-color="black"
              rounded
              size="md"
              no-caps
              @click="signInWithGoogle"
            >
              <i class="fab fa-google"></i> Google
            </q-btn>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const username = ref('');
const password = ref('');
const $q = useQuasar();
const router = useRouter();

const onsubmit = async () => {
  if (!username.value || !password.value) {
    $q.notify({
      type: 'negative',
      message: 'Username and password are required.',
    });
    return;
  }
  try {
    const data = {
      username: username.value,
      password: password.value,
    };

    const response = await fetch(
      `${process.env.VUE_APP_BASE_URL}/api/v1/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const status = await response.json();
    if (status.success) {
      $q.notify({
        type: 'positive',
        message: status.message,
      });
      localStorage.setItem('token', status.token);
      localStorage.setItem('id', status.id);

      const token = localStorage.getItem('token');
      const decodedPayload = jwtDecode(token);

      localStorage.setItem('userType', decodedPayload.role);

      if (localStorage.getItem('userType') === 'Admin') {
        router.push('/admin'); // Route to admin page if user is an admin
      } else {
        router.push('/auth'); // Route to a different page if user is not an admin
      }
    } else if (!status.success) {
      $q.notify({
        type: 'negative',
        message: status.message,
      });
      return;
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'An error occurred. Please try again later.',
    });
    console.error('Error:', error);
  }
};

const signInWithGoogle = async () => {
  const response = await axios.post(
    `${process.env.VUE_APP_BASE_URL}/api/v1/requestgoogle`
  );

  const popup = window.open(
    response.data.url,
    '_blank',
    'width=500,height=600'
  );

  window.addEventListener('message', (event) => {
    console.log(event);
    if (event.origin !== `${process.env.VUE_APP_BASE_URL}`) {
      // Ensure the message is coming from your server
      return;
    }

    const { success, message, id, token } = event.data;

    if (success) {
      setTimeout(() => {
        $q.notify({
          progress: true,
          type: 'positive',
          message: message,
        });
      }, 5000);

      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      router.push('/auth'); // Or the appropriate route based on your app logic
    } else {
      $q.notify({
        type: 'negative',
        message: message,
      });
    }
  });
};
</script>

<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Social button hover effects */
.social-btn {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.google-btn:hover {
  background-color: #db4437;
  color: white;
}
</style>
