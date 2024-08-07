<template>
  <div class="q-pa-md">
    <!-- Loading Overlay -->
    <q-dialog v-model="showOverlay" persistent>
      <q-spinner color="primary" size="50px" />
      <div class="text-subtitle1 q-mt-md">Processing your payment...</div>
    </q-dialog>

    <q-stepper v-model="step" ref="stepper" animated active-color="purple">
      <q-step :name="1" prefix="1" title="Select your ingredients">
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
          <div v-if="loading" class="loading-message">Loading...</div>
          <div v-else>
            <div class="text-h6">Select Bread Type</div>
            <div
              v-for="breadType in breadTypes"
              :key="breadType"
              class="checkbox-container"
            >
              <q-radio
                v-model="selectedBread"
                :val="breadType"
                :label="`${breadType} - €2.00`"
                color="green"
                style="
                  border-radius: 2px;
                  border-bottom: 1px solid #73ad21;
                  border-color: black;
                  width: 100%;
                  height: 50px;
                "
                checked-icon="radio_button_checked"
                unchecked-icon="radio_button_unchecked"
                class="custom-radio"
              />
            </div>

            <div class="q-mt-md text-h6">Select Ingredients</div>
            <div
              v-for="ingredient in ingredients"
              :key="ingredient._id"
              class="checkbox-container"
            >
              <q-checkbox
                v-model="selection"
                :val="ingredient._id"
                :label="`${ingredient.name} - €${ingredient.price.toFixed(2)}`"
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
          </div>
        </q-scroll-area>
      </q-step>

      <q-step :name="2" prefix="2" title="Select a time slot">
        <!-- <time-slot-selector style="height: 250px" /> -->
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
          <div v-for="slot in slots" :key="slot._id" class="checkbox-container">
            <q-radio
              v-model="savedSlot"
              :val="slot._id"
              :label="`${slot.hours} : ${slot.minutes}`"
              color="green"
              style="
                border-radius: 2px;
                border-bottom: 1px solid #73ad21;
                border-color: black;
                width: 100%;
                height: 50px;
              "
              checked-icon="radio_button_checked"
              unchecked-icon="radio_button_unchecked"
              class="custom-radio"
            />
          </div>
        </q-scroll-area>
      </q-step>

      <q-step :name="3" prefix="3" title="Pay Order">
        Pay your order with PayPal
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            class="q-ml-sm"
            v-if="step == 3"
            color="green"
            bg-color="white"
            label="Pay"
            @click="placeOrder"
          />
          <q-btn
            v-if="step == 1"
            :disable="disableContinue"
            @click="$refs.stepper.next()"
            color="deep-orange"
            label="Continue"
          />
          <q-btn
            v-if="step == 2"
            :disable="disableContinueSandwich"
            @click="$refs.stepper.next()"
            color="deep-orange"
            label="Continue"
          />
          <q-btn
            class="q-ml-sm"
            v-if="step == 1"
            color="red"
            bg-color="white"
            label="Cancel"
            @click="cancelOrder"
          />
          <q-btn
            v-if="step == 1"
            flat
            bg-color="green"
            color="green"
            @click="saveSandwich"
            label="Save Sandwich"
            class="q-ml-sm"
          />
          <q-btn
            v-if="step == 2"
            flat
            bg-color="green"
            color="green"
            @click="saveSlot"
            label="Select TimeSlot"
            class="q-ml-sm"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="deep-orange"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
//import TimeSlotSelector from '../pages/TimeSlotSelectorPage.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const step = ref(1);
    const selection = ref([]);
    const ingredients = ref([]);
    const slots = ref([]);
    const savedSlot = ref(null);
    const breadTypes = [
      'White Bread',
      'Whole Grain',
      'Sourdough',
      'Rye Bread',
      'Multigrain',
    ];
    const selectedBread = ref(null);
    const loading = ref(true);
    const sandwichSaved = ref(false); // Flag to track if sandwich has been saved
    const timeSlotSaved = ref(false); // Flag to track if timeslot has been saved
    const showOverlay = ref(false); // Flag to control the overlay

    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/api/v1/ingredients`
        );
        ingredients.value = response.data.ingredients;
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      } finally {
        loading.value = false;
      }
    };
    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/api/v1/slots`
        );
        slots.value = response.data.slots;
      } catch (error) {
        console.error('Error fetching slots:', error);
      } finally {
        loading.value = false;
      }
    };

    const selectTimeSlot = async (slot) => {
      try {
        savedSlot.value = slot;
        console.log(savedSlot.value);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(async () => {
      await fetchIngredients();
      await fetchSlots();
    });

    const thumbStyle = {
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75,
    };

    const barStyle = {
      right: '2px',
      borderRadius: '7px',
      backgroundColor: '#027be3',
      width: '9px',
      opacity: 0.2,
    };

    const disableContinue = computed(() => {
      return (
        selectedBread.value === null ||
        selection.value.length === 0 ||
        !sandwichSaved.value
      );
    });
    const disableContinueSandwich = computed(() => {
      return savedSlot.value === null || !timeSlotSaved.value;
    });

    const placeOrder = async () => {
      showOverlay.value = true; // Show overlay when payment starts
      try {
        const totPrice = {
          totalprice: localStorage.getItem('price'),
        };
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/api/v1/paypal/pay`,
          totPrice
        );
        const popup = window.open(
          response.data.url,
          '_blank',
          'width=500,height=600'
        );

        window.addEventListener('message', (event) => {
          if (event.origin !== `${process.env.VUE_APP_BASE_URL}`) {
            // Ensure the message is coming from your server
            return;
          }

          const success = event.data.success;
          const message = event.data.message;

          if (success) {
            setTimeout(() => {
              $q.notify({
                progress: true,
                type: 'positive',
                message: message,
              });
            }, 5000);
            router.push('/orderSuccess'); // Or the appropriate route based on your app logic
          } else {
            $q.notify({
              type: 'negative',
              message: message,
            });
          }

          showOverlay.value = false; // Hide overlay after response
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Error, something went wrong 😭',
        });
        showOverlay.value = false; // Hide overlay on error
      }
    };

    const sendSandwich = async () => {
      try {
        const sandwichData = {
          breadType: selectedBread.value,
          ingredientsID: selection.value, // Sending selected ingredient IDs
        };

        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/api/v1/sandwich`,
          sandwichData
        );
        localStorage.setItem('price', response.data.sandwichPrice);
        localStorage.setItem('sandwichID', response.data.sandwichID);

        // Set sandwichSaved to true after successfully saving sandwich data
        sandwichSaved.value = true;
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Failed to send order data',
        });
        console.error('Error sending order data:', error);
        throw error;
      }
    };

    const sendSlot = async () => {
      try {
        const slotData = {
          userID: localStorage.getItem('id'),
          slotID: savedSlot.value,
          content: localStorage.getItem('sandwichID'),
          total: localStorage.getItem('price'),
          status: 'toDo',
        };

        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/api/v1/order`,
          slotData
        );

        if (response.data.success) {
          $q.notify({
            type: 'positive',
            message: 'Selected slot with success',
          });
        }

        timeSlotSaved.value = true;
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Failed to select timeslot',
        });
        console.error('Error selecting slot:', error);
        throw error;
      }
    };
    const saveSandwich = async () => {
      try {
        await sendSandwich();
      } catch (error) {
        console.error('Error saving sandwich:', error);
      }
    };

    const saveSlot = async () => {
      try {
        await sendSlot();
      } catch (error) {
        console.error('Error saving sandwich:', error);
      }
    };
    const cancelOrder = () => {
      selection.value = [];
      selectedBread.value = null;
      sandwichSaved.value = false; // Reset sandwichSaved flag on cancel
    };

    // Computed property to get details of selected ingredients
    const selectedIngredients = computed(() => {
      return ingredients.value.filter((ingredient) =>
        selection.value.includes(ingredient._id)
      );
    });
    const selectedTimeSlot = computed(() => {
      return slots.value.filter((slot) => selection.value.includes(slot._id));
    });

    return {
      step,
      selection,
      selectedBread,
      thumbStyle,
      barStyle,
      disableContinue,
      disableContinueSandwich,
      placeOrder,
      cancelOrder,
      saveSandwich,
      saveSlot,
      selectTimeSlot,
      ingredients,
      breadTypes,
      loading,
      selectedIngredients,
      selectedTimeSlot,
      showOverlay,
      slots,
      savedSlot,
    };
  },
  // components: {
  //   TimeSlotSelector,
  // },
};
</script>
<style scoped>
.loading-message {
  text-align: center;
  margin-top: 20px;
}

.checkbox-container {
  margin-bottom: 10px;
}

.custom-checkbox,
.custom-radio {
  width: 100%;
}

.q-mt-md {
  margin-top: 20px;
}

.text-h6 {
  font-weight: bold;
  margin-bottom: 10px;
}

.q-dialog__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
