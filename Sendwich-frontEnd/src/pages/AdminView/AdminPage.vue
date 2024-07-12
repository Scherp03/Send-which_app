<template>
  <q-page padding>
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page padding>
          <q-card>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <!-- Ingredients Section -->
                <div class="col-6">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">Add Ingredients</div>
                      <q-input
                        v-model="newIngredient.name"
                        label="New Ingredient"
                        @keyup.enter="addIngredient"
                      />
                      <q-input
                        v-model="newIngredient.price"
                        label="Price in €"
                        type="number"
                        @keyup.enter="addIngredient"
                      />
                      <q-btn
                        icon="add"
                        color="primary"
                        @click="addIngredient"
                      >
                        Add
                      </q-btn>
                      <q-list>
                        <q-item
                          v-for="(ingredient, index) in ingredients"
                          :key="index"
                        >
                          <q-item-section>
                            {{ ingredient.name }} - €{{ ingredient.price }}
                          </q-item-section>
                          <q-item-section side>
                            <q-btn
                              dense
                              flat
                              round
                              icon="close"
                              @click="removeIngredient(index)"
                            />
                          </q-item-section>
                        </q-item>
                      </q-list>
                      <q-btn
                        color="green"
                        @click="submitIngredients"
                      >
                        Submit Ingredients
                      </q-btn>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- Orders Section -->
                <div class="col-6">
                  <q-card>
                    <q-card-section>
                      <div class="text-h6">Orders</div>
                      <q-list>
                        <q-item
                          v-for="(order, index) in orders"
                          :key="index"
                        >
                          <q-item-section>{{ order.name }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    const newIngredient = ref({ name: '', price: '' });
    const ingredients = ref([]);
    const orders = ref([]);

    const addIngredient = () => {
      if (newIngredient.value.name && newIngredient.value.price) {
        ingredients.value.push({ ...newIngredient.value });
        newIngredient.value = { name: '', price: '' };
      } else {
        $q.notify({
          type: 'warning',
          message: 'Please enter both name and price',
        });
      }
    };

    const removeIngredient = (index) => {
      ingredients.value.splice(index, 1);
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders');
        orders.value = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
        $q.notify({
          type: 'negative',
          message: 'Error fetching orders',
        });
      }
    };

    const submitIngredients = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/ingredients', ingredients.value);
        $q.notify({
          type: 'positive',
          message: 'Ingredients submitted successfully',
        });
        ingredients.value = []; // Clear the list after submission
      } catch (error) {
        console.error('Error submitting ingredients:', error);
        $q.notify({
          type: 'negative',
          message: 'Error submitting ingredients',
        });
      }
    };

    onMounted(() => {
      fetchOrders();
    });

    return {
      newIngredient,
      ingredients,
      orders,
      addIngredient,
      removeIngredient,
      submitIngredients,
    };
  },
};
</script>
<style scoped>


.row {
  display: flex;
  flex-wrap: wrap;
}

.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 10px;
}
</style>
