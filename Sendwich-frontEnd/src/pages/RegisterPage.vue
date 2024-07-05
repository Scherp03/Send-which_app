<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-form
        style="max-width: 300px"
        @submit.prevent="onsubmit"
        class="fixed-center"
      >
        <transition appear enter-active-class="animated fadeIn slower delay-1s">
          <div
            style="
              color: white;
              font-size: 15px;
              font-type: Verdana;
              font-weight: bold;
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
              label="username"
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
        <br />
        <br />
        <br />
        <transition appear enter-active-class="animated fadeIn delay-7s">
          <q-btn
            style="max-width: 300px; height: 10%"
            class="fixed-bottom"
            push
            color="black"
            bg-color="white"
            type="submit"
            label="Register"
          />
        </transition>
      </q-form>
    </div>
  </q-page>
</template>
<script setup>
defineOptions({
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async onsubmit() {
      try {
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
        };
        console.log(data);
        const response = await fetch(`http://localhost:3000/api/v1/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const status = await response.json();
        if (status.success) {
          this.$q.notify({
            type: "positive",
            message: status.message,
          });
          this.$router.push("/login");
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

    // await axios
    //   .post("/api/v1/users", data) //to check
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // this.$router.push("/signin");
  },
});
</script>

<style>
.delay-6s {
  animation-delay: 1.935s;
}

.delay-7s {
  animation-delay: 2.4s;
}
</style>
