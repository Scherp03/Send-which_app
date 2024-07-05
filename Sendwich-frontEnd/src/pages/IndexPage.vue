<template>
  <q-page padding>
    <transition-group
      appear
      enter-active-class="animated fadeIn slower delay-0.5s repeat-2"
      leave-active-class="animated fadeOut"
    >
      <div class="fixed-center" style="width: 70%">
        <!-- We wrap a "p" tag and a QBtn -->

        <h1
          class="fixed-center"
          key="Enter message"
          style="font-weight: bolder; color: white; font-size: 400%"
        >
          WELCOME TO SEND-WHICH APP
          <h2
            key="userfirstName"
            style="font-weight: bolder; color: red; font-size: 300%"
          >
            {{ firstName }}
          </h2>
        </h1>
        <div style="height: 400px"></div>

        <q-btn
          push
          key="loginbtn"
          color="black"
          label="LOGIN"
          to="/login"
          style="left: 20%; width: 30%; height: 40px"
        ></q-btn>
        <q-btn
          push
          key="registerbtn"
          color="green"
          label="REGISTER"
          to="/register"
          style="left: 25%; width: 30%; height: 40px"
        ></q-btn>
      </div>
    </transition-group>
  </q-page>
</template>
<script setup>
import axios from "axios";
defineOptions({
  data() {
    return {
      message: "Welcome to Sendwich APP",

      firstName: "",
      // user:'',
      // password:'',
    };
  },

  methods: {
    login() {},
    signUp() {},

    alertMessage() {
      alert(this.message);
    },
  },
  computed: {},
  directives: {},

  async created() {
    const response = await axios.get("http://localhost:3000/api/v1/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"), //to repeat every time
      },

      firstName: response.firstName,
    });
    console.log(response);
  },
});
</script>

<style>
.border-gray {
  border: 1px solid gray;
}
.id {
  background-color: redS;
}
.error {
  color: red;
  background-color: pink;
}
</style>
