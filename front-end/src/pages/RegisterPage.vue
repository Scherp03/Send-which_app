<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-form style="max-width: 300px; margin: auto" @submit.prevent="onsubmit">
        <transition appear enter-active-class="animated fadeIn slower delay-1s">
          <div
            style="
              color: white;
              font-size: 15px;
              font-family: Verdana;
              font-weight: bold;
              text-align: center;
            "
          >
            PLEASE REGISTER YOURSELF
          </div>
        </transition>

        <br />
        <br />
        <transition appear enter-active-class="animated fadeIn slower delay-2s">
          <div>
            <q-input
              style="max-width: 300px"
              color="black"
              bg-color="white"
              outlined
              v-model="firstName"
              label="First Name"
              type="name"
              required
            />
          </div>
        </transition>

        <br />
        <transition appear enter-active-class="animated fadeIn slower delay-3s">
          <div>
            <q-input
              style="max-width: 300px"
              color="black"
              bg-color="white"
              outlined
              v-model="lastName"
              label="Last Name"
              type="name"
              required
            />
          </div>
        </transition>

        <br />
        <transition appear enter-active-class="animated fadeIn slower delay-4s">
          <div>
            <q-input
              style="max-width: 300px"
              color="black"
              bg-color="white"
              outlined
              v-model="username"
              label="Username"
              type="name"
              required
            />
          </div>
        </transition>

        <br />
        <transition appear enter-active-class="animated fadeIn slower delay-5s">
          <div>
            <q-input
              style="max-width: 300px"
              color="black"
              bg-color="white"
              outlined
              v-model="email"
              label="Email"
              type="email"
              required
            />
          </div>
        </transition>

        <br />
        <transition appear enter-active-class="animated fadeIn slower delay-6s">
          <div>
            <q-input
              style="max-width: 300px"
              color="black"
              bg-color="white"
              outlined
              v-model="password"
              label="Password"
              type="password"
              required
            />
          </div>
        </transition>

        <br />
        <transition appear enter-active-class="animated fadeIn slower delay-7s">
          <div>
            <q-input
              style="max-width: 300px"
              color="black"
              bg-color="white"
              outlined
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              required
            />
          </div>
        </transition>

        <br />
        <br />
        <transition appear enter-active-class="animated fadeIn delay-8s">
          <q-btn
            style="max-width: 300px; height: 10%; margin-bottom: 15px"
            push
            color="black"
            bg-color="white"
            type="submit"
            label="Register"
          />
        </transition>

        <transition appear enter-active-class="animated fadeIn delay-9s">
          <q-btn
            style="max-width: 300px; height: 10%; margin-bottom: 15px"
            push
            color="red"
            bg-color="white"
            label="Sign Up with Google"
            @click="signUpWithGoogle"
          />
        </transition>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const firstName = ref('');
    const lastName = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const onsubmit = async () => {
      if (password.value !== confirmPassword.value) {
        $q.notify({
          type: 'negative',
          message: 'Passwords do not match.',
        });
        return;
      }

      try {
        const data = {
          firstName: firstName.value,
          lastName: lastName.value,
          username: username.value,
          email: email.value,
          password: password.value,
        };
        console.log(data);
        const response = await fetch(`http://localhost:3000/api/v1/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const status = await response.json();
        if (status.success) {
          $q.notify({
            type: 'positive',
            message: status.message,
          });
          router.push('/login');
        } else {
          $q.notify({
            type: 'negative',
            message: status.message,
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

    const signUpWithGoogle = async () => {
      const response = await axios.post(
        'http://localhost:3000/api/v1/requestgoogle'
      );
      const popup = window.open(
        response.data.url,
        '_blank',
        'width=500,height=600'
      );

      window.addEventListener('message', (event) => {
        console.log(event);
        if (event.origin !== 'http://127.0.0.1:3000') {
          // Ensure the message is coming from your server
          return;
        }

        const { success, message, id, token } = event.data;

        if (success) {
          setTimeout(() => {
            $q.notify({
              progress: true,
              type: 'warning',
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

    return {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      onsubmit,
      signUpWithGoogle,
    };
  },
};
// import axios from 'axios';
// import { useRouter } from 'vue-router';
// import { useQuasar } from 'quasar';
// const router = useRouter();
// // const $q = useQuasar();

// defineOptions({
//   data() {
//     return {
//       firstName: '',
//       lastName: '',
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     };
//   },

//   methods: {
//     async onsubmit() {
//       if (this.password !== this.confirmPassword) {
//         this.$q.notify({
//           type: 'negative',
//           message: 'Passwords do not match.',
//         });
//         return;
//       }

//       try {
//         const data = {
//           firstName: this.firstName,
//           lastName: this.lastName,
//           username: this.username,
//           email: this.email,
//           password: this.password,
//         };
//         console.log(data);
//         const response = await fetch(`http://localhost:3000/api/v1/users`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
//         const status = await response.json();
//         if (status.success) {
//           this.$q.notify({
//             type: 'positive',
//             message: status.message,
//           });
//           this.$router.push('/login');
//         } else if (!status.success) {
//           this.$q.notify({
//             type: 'negative',
//             message: status.message,
//           });
//         }
//       } catch (error) {
//         this.$q.notify({
//           type: 'negative',
//           message: 'An error occurred. Please try again later.',
//         });
//         console.error('Error:', error);
//       }
//     },

//     async signUpWithGoogle() {
//       const response = await axios.post(
//         'http://localhost:3000/api/v1/requestgoogle'
//       );

//       const popup = window.open(
//         response.data.url,
//         '_blank',
//         'width=500,height=600'
//       );

//       window.addEventListener('message', (event) => {
//         console.log(event);
//         if (event.origin !== 'http://127.0.0.1:3000') {
//           // Ensure the message is coming from your server
//           return;
//         }

//         const { success, message, id, token } = event.data;

//         if (success) {
//           setTimeout(() => {
//             $q.notify({
//               progress: true,
//               type: 'warning',
//               message: message,
//             });
//           }, 5000);

//           localStorage.setItem('token', token);
//           localStorage.setItem('id', id);
//           router.push('/auth'); // Or the appropriate route based on your app logic
//         } else {
//           $q.notify({
//             type: 'negative',
//             message: message,
//           });
//         }
//       });
//     },
//   },
// });
</script>

<style>
.delay-6s {
  animation-delay: 1.935s;
}

.delay-7s {
  animation-delay: 2.4s;
}

.delay-8s {
  animation-delay: 2.865s;
}

.delay-9s {
  animation-delay: 3.33s;
}
</style>
