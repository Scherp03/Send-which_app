<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-form
        @submit.prevent="onsubmit"
        class="fixed-center"
        style="max-width: 300px"
      >
        <transition-group appear enter-active-class="animated fadeIn delay -1s">
          <div
            key="text"
            style="
              color: white;
              font-size: 15px;
              font-type: Verdana;
              font-weight: bold;
            "
          >
            ENTER CREDENTIALS TO LOGIN
          </div>

          <br />
          <br />
          <div style="max-width: 300px" key="username-input">
            <q-input
              color="black"
              bg-color="white"
              outlined
              v-model="username"
              label="Username"
              type="username"
              required
            />
            <br />
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
          <br />
          <br />
          <br />
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
//import store from "src/services/Vuex.js";
import axios from "axios";

defineOptions({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onsubmit() {
      try {
        const data = {
          username: this.username,
          password: this.password,
        };
        console.log(data);

        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          {
            body: JSON.stringify(data),
          }
        );
        const status = await response.json();
        if (status.success) {
          this.$q.notify({
            type: "positive",
            message: status.message,
          });
          localStorage.setItem("token", status.token);
          this.$router.push("/logged");
        } else if (!status.success) {
          this.$q.notify({
            type: "negative",
            message: status.message,
          });
        }
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "An error occurred. Please try again later.",
        });
        console.error("Error:", error);
      }
    },
  },
});
</script>

<style></style>
