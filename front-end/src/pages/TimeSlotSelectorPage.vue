<template>
  <div class="q-pa-md">
    <q-list bordered>
      <q-item
        v-for="slot in timeSlots"
        :key="slot.time"
        clickable
        @click="selectSlot(slot)"
        :active="slot.selected"
      >
        <q-item-section>
          {{ slot.time }}
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="selectedSlot" class="q-mt-md">
      <q-card>
        <q-card-section>
          Selected Slot: {{ selectedSlot.time }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { date } from 'quasar';

export default {
  name: 'TimeSlotSelector',
  setup() {
    const timeSlots = ref(generateTimeSlots());
    const selectedSlot = reactive(null);
    let midnightTimeout;

    function generateTimeSlots() {
      const slots = [];
      let startTime = new Date();
      startTime.setHours(9, 0, 0, 0); // Start at 9 AM
      for (let i = 0; i < 20; i++) {
        // 20 slots from 9 AM to 2 PM, 15 minutes each
        slots.push({
          time: date.formatDate(startTime, 'HH:mm'),
          selected: false,
        });
        startTime = date.addToDate(startTime, { minutes: 15 });
      }
      return slots;
    }

    function resetSlots() {
      timeSlots.value = generateTimeSlots();
    }

    function selectSlot(selectedSlot) {
      timeSlots.value.forEach((slot) => {
        slot.selected = slot.time === selectedSlot.time;
      });
      selectedSlot.value = selectedSlot;
    }

    function setupMidnightReset() {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Set to next midnight
      const timeUntilMidnight = midnight - now;
      midnightTimeout = setTimeout(() => {
        resetSlots();
        setupMidnightReset();
      }, timeUntilMidnight);
    }

    onMounted(() => {
      setupMidnightReset();
    });

    onUnmounted(() => {
      clearTimeout(midnightTimeout);
    });

    return {
      timeSlots,
      selectedSlot,
      selectSlot,
    };
  },
};
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}
</style>
