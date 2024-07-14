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
            LIST OF INGREDIENTS FOR THE SANDWICH
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
          <div v-if="loading" class="loading-message">Loading...</div>
          <div v-else>
            <div
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredient-item"
            >
              {{ ingredient.name }} - €{{ ingredient.price.toFixed(2) }}
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const ingredients = ref([]);
    const loading = ref(true);

    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/ingredients');
        ingredients.value = response.data.ingredients;
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      await fetchIngredients();
    });

    return {
      ingredients,
      loading,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75,
      },
      barStyle: {
        right: '2px',
        borderRadius: '7px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2,
      },
    };
  },
};
</script>

<style>
.ingredient-item {
  padding: 10px;
  border-bottom: 1px solid #73ad21;
  color: black;
  font-size: 16px;
}

.loading-message {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #333;
}
</style>
