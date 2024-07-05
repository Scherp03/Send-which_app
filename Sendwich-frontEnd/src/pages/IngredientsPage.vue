<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="fixed-center">
        <transition appear enter-active-class="animated fadeIn slower delay-1s">
          <div
            style="
              color: white;
              font-size: 25px;
              font-type: Verdana;
              font-weight: bold;
            "
          >
            SELECT THE INGREDIENTS FOR YOUR SANDWICH
          </div>
        </transition>
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="
            height: 350px;
            background-color: whitesmoke;
            border-radius: 2px;

            border: 2px solid #73ad21;
            border-color: black;
          "
        >
          <div>
            <q-checkbox
              v-model="selection"
              val="Salad"
              label="Salad"
              color="green"
              style="
                border-radius: 2px;

                border-bottom: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
          <div style="height: 5px"></div>
          <div>
            <q-checkbox
              v-model="selection"
              val="Tomato"
              label="Tomato"
              color="green"
              style="
                border-radius: 2px;

                border-bottom: 1px solid #73ad21;
                border-top: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
          <div style="height: 5px"></div>
          <div>
            <q-checkbox
              v-model="selection"
              val="Meat"
              label="Meat"
              color="green"
              style="
                border-radius: 2px;

                border-bottom: 1px solid #73ad21;
                border-top: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
          <div style="height: 5px"></div>
          <div>
            <q-checkbox
              v-model="selection"
              val="Mayonese"
              label="Mayonese"
              color="green"
              style="
                border-radius: 2px;

                border-bottom: 1px solid #73ad21;
                border-top: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
          <div style="height: 5px"></div>
          <div>
            <q-checkbox
              v-model="selection"
              val="Cheese"
              label="Cheese"
              color="green"
              style="
                border-bottom: 1px solid #73ad21;
                border-top: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
          <div>
            <q-checkbox
              v-model="selection"
              val="Salad"
              label="Salad"
              color="green"
              style="
                border-radius: 2px;

                border-bottom: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
          <div>
            <q-checkbox
              v-model="selection"
              val="Salad"
              label="Salad"
              color="green"
              style="
                border-radius: 2px;

                border-bottom: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
          <div>
            <q-checkbox
              v-model="selection"
              val="Salad"
              label="Salad"
              color="green"
              style="
                border-radius: 2px;

                border-bottom: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
          <div>
            <q-checkbox
              v-model="selection"
              val="Salad"
              label="Salad"
              color="green"
              style="
                border-radius: 2px;

                border-bottom: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
            />
          </div>
        </q-scroll-area>
        <br />
        <br />
        <br />
        <q-btn
          style="width: 30%; height: 10%"
          class="fixed-bottom-right"
          push
          color="black"
          bg-color="white"
          type="submit"
          label="Order"
          @click="placeOrder()"
        />
        <q-btn
          style="width: 30%; height: 10%"
          class="fixed-bottom-left"
          push
          color="red"
          bg-color="white"
          type="submit"
          label="Cancel"
          @click="cancelOrder()"
        />
        <!-- <div class="q-px-sm">
          The model data: <strong>{{ selection }}</strong>
        </div> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

import axios from "axios";
import { format } from "quasar";

export default {
  setup() {
    return {
      selection: ref([]),
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "7px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
  data() {
    return {};
  },
  methods: {
    async placeOrder() {
      try {
        if (this.selection.length == 0) {
          this.$q.notify({
            type: "negative",
            message: "Error,there are no element to place an order",
          });
          console.log("can't place order, there are no element");
        } else {
          // const response = await axios.post(
          //   "http://localhost:3000/api/v1/auth/login",
          //   {
          //     body: JSON.stringify(data),
          //   }
          // );
          console.log(this.selection);
          this.$q.notify({
            type: "positive",
            message: "Order sent with success",
          });
          this.$router.push("/");
        }
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "Error, something went wrong 😭",
        });
      }
    },
    cancelOrder() {
      this.selection = [];
    },
  },
};
</script>

<style>
/* .scroll {
  background-color: whitesmoke;
  border-radius: 2px;
  opacity: 95%;
  border: 2px solid #73ad21;
  border-color: black;
  width: 30%;
} */
</style>
