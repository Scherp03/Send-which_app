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
                        filled
                        class="q-mb-sm"
                        @keyup.enter="addIngredient"
                      />
                      <q-input
                        v-model="newIngredient.price"
                        label="Price in €"
                        type="number"
                        filled
                        class="q-mb-sm"
                        @keyup.enter="addIngredient"
                      />
                      <q-input
                        v-model="newIngredient.description"
                        label="Description"
                        type="textarea"
                        filled
                        class="q-mb-sm"
                      />
                      <q-input
                        v-model="tagInput"
                        label="Tags (press enter to add)"
                        filled
                        class="q-mb-sm"
                        @keyup.enter="addTag"
                      />
                      <div v-if="newIngredient.tags.length" class="q-mb-sm">
                        <q-chip
                          v-for="(tag, index) in newIngredient.tags"
                          :key="index"
                          removable
                          @remove="removeTag(index)"
                        >
                          {{ tag }}
                        </q-chip>
                      </div>
                      <q-input
                        v-model="newIngredient.quantity"
                        label="Quantity"
                        type="number"
                        filled
                        class="q-mb-sm"
                      />
                      <q-btn
                        icon="add"
                        color="primary"
                        @click="addIngredient"
                        class="q-mb-md"
                      >
                        Add
                      </q-btn>
                      <q-list bordered>
                        <q-item
                          v-for="(ingredient, index) in ingredients"
                          :key="index"
                          class="q-pa-xs"
                          clickable
                          v-ripple
                        >
                          <q-item-section>
                            {{ ingredient.name }} - €{{ ingredient.price
                            }}<br />
                            <span>{{ ingredient.description }}</span
                            ><br />
                            <span
                              v-if="ingredient.tags && ingredient.tags.length"
                              >Tags: {{ ingredient.tags.join(', ') }}</span
                            ><br />
                            <span>Quantity: {{ ingredient.quantity }}</span>
                          </q-item-section>
                          <q-item-section side>
                            <q-btn
                              dense
                              flat
                              round
                              icon="close"
                              color="negative"
                              @click="removeIngredient(index)"
                            />
                          </q-item-section>
                        </q-item>
                      </q-list>
                      <q-btn
                        color="green"
                        @click="submitIngredients"
                        class="q-mt-md"
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
                      <q-list bordered>
                        <q-item
                          v-for="(order, index) in orders"
                          :key="index"
                          class="q-pa-xs"
                          clickable
                          v-ripple
                        >
                          <q-item-section>
                            <div><strong>Slot:</strong> {{ slot[index] }}</div>
                            <div>
                              <strong>Bread Type:</strong>
                              {{ breadType[index] }}
                            </div>
                            <div>
                              <strong>Ingredients:</strong>
                              {{ sandwichcontent[index] }}
                            </div>
                            <div>
                              <strong>Total:</strong> €{{ order.total }}
                            </div>
                            <div>
                              <strong>Status:</strong> {{ order.status }}
                            </div>
                            <div><strong>Date:</strong> {{ order.date }}</div>
                          </q-item-section>
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
    const newIngredient = ref({
      name: '',
      price: '',
      description: '',
      tags: ['sandwich-app'],
      quantity: 100,
    });
    const tagInput = ref('');
    const ingredients = ref([]);
    const orders = ref([]);
    const slot = ref([]);
    const breadType = ref([]);
    const sandwichcontent = ref([]);

    const addIngredient = () => {
      if (newIngredient.value.name && newIngredient.value.price) {
        ingredients.value.push({ ...newIngredient.value });
        newIngredient.value = {
          name: '',
          price: '',
          description: '',
          tags: ['sandwich-app'],
          quantity: 100,
        };
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

    const submitIngredients = async () => {
      try {
        const promises = ingredients.value.map((ingredient) =>
          axios.patch(
            `${process.env.VUE_APP_BASE_URL}/api/v1/ingredients/add`,
            ingredient
          )
        );
        await Promise.all(promises);
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

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}/api/v1/order`
        );
        if (response.data.success) {
          orders.value = response.data.orders;
          const slotID = orders.value.map((order) => order.slotID); // mapped ID
          const sandwichID = orders.value.map((order) => order.content); //mapped content

          for (let i = 0; i < slotID.length; i++) {
            try {
              const response = await axios.get(
                `${process.env.VUE_APP_BASE_URL}/api/v1/slots/${slotID[i]}`
              );
              slot.value.push(response.data.time);
            } catch (slotError) {
              console.error(
                `Error fetching slot with ID ${slotID[i]}:`,
                slotError
              );
            }
          }

          for (let i = 0; i < sandwichID.length; i++) {
            let variable = [];
            try {
              const response = await axios.get(
                `${process.env.VUE_APP_BASE_URL}/api/v1/sandwich/${sandwichID[i]}`
              );
              const ingredientsID = response.data.sandwichIngredientsId;
              breadType.value.push(response.data.sandwichBreadType);
              for (let j = 0; j < ingredientsID.length; j++) {
                const response2 = await axios.get(
                  `${process.env.VUE_APP_BASE_URL}/api/v1/ingredients/${ingredientsID[j]}`
                );
                variable.push(response2.data.ingredient.name);
                // console.log(response2.data.ingredient.name);
              }
              sandwichcontent.value.push(variable);
            } catch (slotError) {
              console.error(
                `Error fetching slot with ID ${slotID[i]}:`,
                slotError
              );
            }
          }
          console.log(sandwichcontent);
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Error fetching orders',
        });
      }
    };

    const addTag = () => {
      if (tagInput.value) {
        newIngredient.value.tags.push(tagInput.value);
        tagInput.value = '';
      }
    };

    const removeTag = (index) => {
      newIngredient.value.tags.splice(index, 1);
    };

    onMounted(() => {
      fetchOrders();
    });

    return {
      newIngredient,
      tagInput,
      ingredients,
      orders,
      slot,
      breadType,
      sandwichcontent,
      addIngredient,
      removeIngredient,
      submitIngredients,
      addTag,
      removeTag,
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
  max-width: 70%;
  padding: 10px;
}

.q-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.q-list {
  max-height: 300px;
  overflow-y: auto;
}

.q-btn {
  width: 100%;
}

.q-input {
  width: 100%;
}
</style>
