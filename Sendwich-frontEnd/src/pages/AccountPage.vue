<template>
  <q-page padding>
    <q-card class="q-mt-md q-pa-md">
      <q-card-section>
        <div class="text-h6">Account Settings</div>
      </q-card-section>
      
      <q-card-section class="q-gutter-md">
        <q-form @submit.prevent="submitForm">
          <div class="q-layout">
            <!-- Left Column -->
            <div class="q-column">
              <q-input
                v-if="showUsername"
                v-model="username"
                label="Username"
                filled
                clearable
                class="q-mb-md"
              />
              <q-input
                v-if="showEmail"
                v-model="email"
                label="Email"
                type="email"
                filled
                clearable
                class="q-mb-md"
              />
              <q-input
                v-if="showFirstName"
                v-model="firstName"
                label="First Name"
                filled
                clearable
                class="q-mb-md"
              />
            </div>
            <div class="q-column" style="width:50px"> </div>
            <!-- Right Column -->
            <div class="q-column">
              <q-input
                v-if="showLastName"
                v-model="lastName"
                label="Last Name"
                filled
                clearable
                class="q-mb-md"
              />
              <q-input
                v-if="showPassword"
                v-model="password"
                label="Password"
                type="password"
                filled
                clearable
                class="q-mb-md"
              />
              <q-uploader
                url="http://localhost:3000/upload"
                v-if="showIcon"
                v-model="icon"
                label="Upload Icon"
                accept="image/*"
                filled
                @rejected="onFileRejected"
                class="q-mb-md"
              />
            </div>
          </div>
          
          <div class="q-mt-md q-flex q-justify-end">
            <q-btn label="Save Changes" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const username = ref('');
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const icon = ref([]);
const $q = useQuasar();

const showUsername = ref(true);
const showEmail = ref(true);
const showFirstName = ref(true);
const showLastName = ref(true);
const showPassword = ref(true);
const showIcon = ref(true);

const submitForm = () => {
  // Handle form submission logic as needed
  $q.notify({
    type: 'positive',
    message: 'Account settings updated successfully!'
  });
};

const onFileRejected = (file) => {
  $q.notify({
    type: 'negative',
    message: `File "${file.name}" was rejected. Please upload a valid image file.`
  });
};
</script>

<style scoped>
/* Custom styles */
.q-layout {
  display: flex;
  justify-content: space-between;
}

.q-column {
  flex: 1; /* Equal width columns */
}

.q-mb-md {
  margin-bottom: 20px; /* Medium margin bottom between inputs */
}

.q-mt-md {
  margin-top: 20px; /* Medium margin top for the button */
}
</style>
