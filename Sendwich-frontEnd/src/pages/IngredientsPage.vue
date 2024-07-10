<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="fixed-center">
        <transition appear enter-active-class="animated fadeIn slower delay-1s">
          <div
            style="
              color: white;
              font-size: 25px;
              font-family: Verdana;
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
          <div v-for="ingredient in ingredients" :key="ingredient" class="checkbox-container">
            <q-checkbox
              v-model="selection"
              :val="ingredient"
              :label="ingredient"
              color="green"
              style="
                border-radius: 2px;
                border-bottom: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
              checked-icon="check_circle"
              unchecked-icon="check"
              class="custom-checkbox"
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const ingredients = [
      "Salad",
      "Tomato",
      "Meat",
      "Mayonese",
      "Cheese",
      "Ham",
      "Turkey",
      "Lettuce",
      "Onion",
      "Pickles",
    ];
    const selection = ref([]);

    return {
      selection,
      ingredients,
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
  methods: {
    async placeOrder() {
      try {
        if (this.selection.length == 0) {
          this.$q.notify({
            type: "negative",
            message: "Error, there are no ingredients selected.",
          });
          console.log("Can't place order, there are no ingredients selected.");
        } else {
          console.log(this.selection);
          this.$q.notify({
            type: "positive",
            message: "Order placed successfully.",
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
.checkbox-container {
  margin-bottom: 5px;
}

.custom-checkbox .q-checkbox__inner--checked .q-checkbox__bg {
  background-color: #73ad21 !important;
}

.custom-checkbox .q-checkbox__inner--focus .q-checkbox__bg {
  border-color: #73ad21 !important;
}

.custom-checkbox .q-checkbox__inner--hover .q-checkbox__bg {
  border-color: #73ad21 !important;
}

/* Change label color when checkbox is checked */
.custom-checkbox .q-checkbox__inner--checked + .q-checkbox__label {
  color: green !important;
}
</style>
