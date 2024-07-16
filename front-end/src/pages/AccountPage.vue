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
                :class="{ changed: username !== originalValues.username }"
              />
              <q-input
                v-if="showEmail"
                v-model="email"
                label="Email"
                type="email"
                filled
                clearable
                class="q-mb-md"
                :class="{ changed: email !== originalValues.email }"
              />
              <q-input
                v-if="showFirstName"
                v-model="firstName"
                label="First Name"
                filled
                clearable
                class="q-mb-md"
                :class="{ changed: firstName !== originalValues.firstName }"
              />
            </div>
            <div class="q-column" style="width: 50px"></div>
            <!-- Right Column -->
            <div class="q-column">
              <q-input
                v-if="showLastName"
                v-model="lastName"
                label="Last Name"
                filled
                clearable
                class="q-mb-md"
                :class="{ changed: lastName !== originalValues.lastName }"
              />
              <q-input
                v-if="showPassword"
                v-model="password"
                :type="passwordVisible ? 'text' : 'password'"
                label="Password"
                filled
                clearable
                class="q-mb-md"
                :class="{ changed: password !== '' }"
              >
                <template v-slot:append>
                  <q-icon
                    :name="passwordVisible ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="togglePasswordVisibility"
                  />
                </template>
              </q-input>
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
import { ref, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Reactive references for form fields
const username = ref('');
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const passwordVisible = ref(false);
const $q = useQuasar();
const router = useRouter();

// Toggle display of form fields
const showUsername = ref(true);
const showEmail = ref(true);
const showFirstName = ref(true);
const showLastName = ref(true);
const showPassword = ref(true);

// Original values for comparison
const originalValues = reactive({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
});

// Fetch user data from API
const fetchUserDataUrl = (id) =>
  `${process.env.VUE_APP_BASE_URL}/api/v1/users/${id}`;

const fetchUserData = async () => {
  try {
    const response = await axios.get(
      fetchUserDataUrl(localStorage.getItem('id')),
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
    // Populate form fields with fetched data
    username.value = response.data.username;
    email.value = response.data.email;
    firstName.value = response.data.firstName;
    lastName.value = response.data.lastName;

    // Set original values
    originalValues.username = response.data.username;
    originalValues.email = response.data.email;
    originalValues.firstName = response.data.firstName;
    originalValues.lastName = response.data.lastName;
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error fetching user data',
    });
    console.error('Error fetching user data:', error);
  }
};

onMounted(fetchUserData);

// Toggle password visibility
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// Submit form data to API
const submitForm = async () => {
  const updatedData = {};

  // Check each field and add it to updatedData if it has changed
  if (username.value !== originalValues.username) {
    updatedData.username = username.value;
  }
  if (email.value !== originalValues.email) {
    updatedData.email = email.value;
  }
  if (firstName.value !== originalValues.firstName) {
    updatedData.firstName = firstName.value;
  }
  if (lastName.value !== originalValues.lastName) {
    updatedData.lastName = lastName.value;
  }
  if (password.value !== '') {
    updatedData.password = password.value;
  }

  console.log('Updating user data:', updatedData);

  try {
    const response = await axios.patch(
      fetchUserDataUrl(localStorage.getItem('id')),
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (response.status === 200) {
      $q.notify({
        type: 'positive',
        message: 'Account settings updated successfully!',
      });

      // Fetch user data again to update original values
      await fetchUserData();

      // Clear the password field after saving
      if (updatedData.password) password.value = '';
      localStorage.clear();
      // Optional: Redirect to another page after saving
      router.push('/login');
    } else {
      throw new Error(
        response.data.message || 'Error updating account settings'
      );
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Error updating account settings',
    });
    console.error('Error updating account settings:', error);
  }
};
</script>

<style scoped>
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

.changed {
  background-color: yellow;
}
</style>
