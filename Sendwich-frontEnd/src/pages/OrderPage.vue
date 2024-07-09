<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      active-color="purple"
    >
      <q-step
        :name="1"
        prefix="1"
        title="Select campaign settings"
      >
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
        
        </q-scroll-area>
      </q-step>

      <q-step
        :name="2"
        prefix="2"
        title="Create an ad group"
        caption="Optional"
      >
         <time-slot-selector style="height: 250px" />
      </q-step>

      <q-step
        :name="3"
        prefix="3"
        title="Create an ad"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
          class="q-ml-sm"
          v-if="step==1"
          color="red"
          bg-color="white"
          label="Cancel"
          @click="cancelOrder()"
        />
          <q-btn
          class="q-ml-sm"
          v-if="step==3"
          color="green"
          bg-color="white"
          label="Pay"
          @click="placeOrder()"
        />
        
          <q-btn v-if="step<3"  @click="$refs.stepper.next()" color="deep-orange" label="Continue" />
          <q-btn v-if="step > 1" flat color="deep-orange" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { ref } from 'vue';
import TimeSlotSelector from '../pages/TimeSlotSelectorPage.vue';

export default {
  setup () {
    return {
      step: ref(1),
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
    }
  },
   components: {
    TimeSlotSelector,
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
  }
}
</script>
