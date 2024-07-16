<template>
  <q-page padding>
    <q-card class="q-pa-md" style="max-width: 600px; margin: auto">
      <q-card-section>
        <div class="text-h6">Contact Us</div>
      </q-card-section>

      <q-form @submit="onSubmit">
        <q-card-section>
          <q-input
            v-model="name"
            label="Name"
            filled
            required
            :rules="[(val) => !!val || 'Name is required']"
            class="q-mb-md"
          />
          <q-input
            v-model="email"
            label="Email"
            type="email"
            filled
            required
            :rules="[
              (val) => !!val || 'Email is required',
              (val) => /.+@.+\..+/.test(val) || 'Email must be valid',
            ]"
            class="q-mb-md"
          />
          <q-input
            v-model="subject"
            label="Subject"
            filled
            required
            :rules="[(val) => !!val || 'Subject is required']"
            class="q-mb-md"
          />
          <q-input
            v-model="message"
            label="Message"
            type="textarea"
            filled
            required
            :rules="[(val) => !!val || 'Message is required']"
            class="q-mb-md"
            autogrow
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn type="submit" label="Submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';

export default {
  name: 'ContactForm',
  setup() {
    const $q = useQuasar();
    const name = ref('');
    const email = ref('');
    const subject = ref('');
    const message = ref('');

    const onSubmit = async () => {
      if (!name.value || !email.value || !subject.value || !message.value) {
        $q.notify({
          type: 'warning',
          message: 'All fields are required',
        });
        return;
      }

      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}/api/contact`, {
          name: name.value,
          email: email.value,
          subject: subject.value,
          message: message.value,
        });
        $q.notify({
          type: 'positive',
          message: 'Message sent successfully',
        });
        name.value = '';
        email.value = '';
        subject.value = '';
        message.value = '';
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Failed to send message',
        });
      }
    };

    return {
      name,
      email,
      subject,
      message,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.q-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
