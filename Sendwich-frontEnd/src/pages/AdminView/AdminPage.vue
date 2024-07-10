<template>
    <q-page>
    </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      check1: ref(true),
      check2: ref(false),
      check3: ref(false),

      notif1: ref(true),
      notif2: ref(true),
      notif3: ref(false),

      volume: ref(6),
      brightness: ref(3),
      mic: ref(8)
    }
  }
}
</script>
