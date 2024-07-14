<template>
  <q-page padding>
    <div class="q-pa-md row justify-center items-center text-center">
      <div>
        <h1 style="color:white">Order Completed</h1>
        <p style="color:white">You will be redirected to the home page.</p>
        <q-btn color="primary" @click="handleLogout" label="Go to Home and Logout" class="q-mt-md" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const handleLogout = () => {
      // Perform logout logic here, e.g., clear tokens, session, etc.
      // For demonstration, we'll use a simple localStorage clear
      localStorage.clear();

      // Show a notification that logout was successful
      $q.notify({
        type: 'positive',
        message: 'Order received, see you soon.',
      });

      // Redirect to home page
      router.push('/');
    };

    // Automatically redirect to home page after 10 seconds
    // setTimeout(() => {
    //   handleLogout();
    // }, 10000);

    return {
      handleLogout,
    };
  },
};
</script>

<style scoped>
.q-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
