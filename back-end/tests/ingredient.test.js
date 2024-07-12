import mongoose from 'mongoose';
import Ingredient from '../database/schemas/ingredient';
import dotenv from 'dotenv';

dotenv.config();

const uri =
  'mongodb+srv://' +
  process.env.DB_CREDENTIALS +
  '@' +
  process.env.DB_HOST +
  '.' + // TO BE EVENTUALLY CHANGED WITH '/'
  process.env.DB_NAME +
  '?retryWrites=true&w=majority&appName=Test1';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

beforeAll(async () => {
  await mongoose.connect(uri, clientOptions);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Ingredient methods', () => {
  // Function 1: addOneSafe
  // Verify basic conditions: name is unique and long enough; adding works
  test('addOneSafe adds an ingredient with a unique and long enough name', async () => {
    await Ingredient.deleteMany({ name: 'UniqueIngredient' }); // Just to make sure, not really needed
    expect(
      await Ingredient.addOneSafe(
        'UI',
        'A unique ingredient with a short name',
        10,
        100,
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(false);
    expect(
      await Ingredient.addOneSafe(
        'UniqueIngredient',
        'A unique ingredient',
        10,
        100,
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(true);
    expect(
      await Ingredient.addOneSafe(
        'UniqueIngredient',
        'A not-so-unique ingredient',
        10,
        100,
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(false); // Duplicate case
    let loadedIngredient = await Ingredient.findOne({
      name: 'UniqueIngredient',
    });
    expect(loadedIngredient).not.toBeNull();
    expect(loadedIngredient.active).toBe(true);
    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  });

  // Verify basic conditions: price and quantity are numbers
  test('addOneSafe adds an ingredient with a valid price and quantity', async () => {
    await Ingredient.deleteMany({ name: 'UniqueIngredient' });
    expect(
      await Ingredient.addOneSafe(
        'UniqueIngredient1',
        'A unique ingredient',
        'quantity',
        100,
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(false);
    expect(
      await Ingredient.addOneSafe(
        'UniqueIngredient2',
        'A unique ingredient',
        10,
        'price',
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(false);
    expect(
      await Ingredient.addOneSafe(
        'UniqueIngredient3',
        'A unique ingredient',
        -10,
        100,
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(false);
    expect(
      await Ingredient.addOneSafe(
        'UniqueIngredient4',
        'A unique ingredient',
        10,
        '100',
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(false);
    expect(
      await Ingredient.addOneSafe(
        'ZeroQuantityIngredient',
        'A unique ingredient',
        0,
        0,
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(true);
    // Limit case: zero is valid, can be changed
    expect(
      await Ingredient.addOneSafe(
        'UniqueIngredient5',
        'A unique ingredient',
        0.5,
        100,
        ['unique', 'toBeDeleted'],
      ),
    ).toBe(true);
    // Delete the test ingredient
    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  });

  // Function 2: changeAvailability
  // Only condition to be verified is that the quantity is a number
  test('changeAvailability changes safely the availability of an ingredient', async () => {
    await Ingredient.addOneSafe('TestIngredient', 'Not very tasty', 0.5, 100, [
      'toBeDeleted',
    ]);
    let loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    // Verify initial quantity
    expect(loadedIngredient.quantity).toBe(100);
    // Verify that a non-number quantity does not change the availability
    expect(loadedIngredient.setAvailability('quantity')).toBe(false);
    // Verify negative numbers do not work, and the number did not change
    expect(loadedIngredient.setAvailability(-10)).toBe(false);
    expect(loadedIngredient.quantity).toBe(100);
    // Verify that a valid number changes the quantity
    loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(loadedIngredient.setAvailability(50)).toBe(true);
    expect(loadedIngredient.quantity).toBe(50);
    // Delete the test ingredient
    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  });

  // Function 3: increaseAvailability
  // Made to wotk with negative numbers as well
  test('increaseAvailability increases the availability of an ingredient by a valid number', async () => {
    await Ingredient.addOneSafe('TestIngredient', 'Not very tasty', 0.5, 100, [
      'toBeDeleted',
    ]);
    let loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(loadedIngredient.increaseAvailability(-50)).toBe(true);
    expect(loadedIngredient.quantity).toBe(50);
    expect(loadedIngredient.increaseAvailability(22)).toBe(true);
    expect(loadedIngredient.quantity).toBe(72);
    // Verify that a non-number quantity does not change the availability
    expect(loadedIngredient.increaseAvailability('quantity')).toBe(false);
    expect(loadedIngredient.increaseAvailability([10])).toBe(false);
    expect(loadedIngredient.quantity).toBe(72);
    // Delete the test ingredient
    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  });

  // Function 4: setAvailability
  test('setAvailability sets the availability to a given number', async () => {
    await Ingredient.addOneSafe('TestIngredient', 'Not very tasty', 0.5, 100, [
      'toBeDeleted',
    ]);
    let loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(await loadedIngredient.setAvailability(-50)).toBe(false);
    expect(loadedIngredient.quantity).toBe(100);
    expect(await loadedIngredient.setAvailability(22)).toBe(true);
    expect(loadedIngredient.quantity).toBe(22);
    // Verify that a non-number quantity does not change the availability
    expect(await loadedIngredient.setAvailability('quantity')).toBe(false);
    expect(await loadedIngredient.setAvailability([10])).toBe(false);
    expect(loadedIngredient.quantity).toBe(22);
    // Delete the test ingredient
    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  });

  // Function 5: safeDelete
  test('safeDelete removes an ingredient from the pool without deleting it, and resets basic parameters', async () => {
    await Ingredient.addOneSafe('TestIngredient', 'Not very tasty', 0.5, 100, [
      'toBeDeleted',
    ]);
    let loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(await loadedIngredient.safeDelete()).toBe(true);
    loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(loadedIngredient.active).toBe(false);
    expect(loadedIngredient.quantity).toBe(0);
    expect(await loadedIngredient.safeDelete()).toBe(false);
    loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(loadedIngredient.active).toBe(false);
    // Delete the test ingredient
    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  });

  // Function 6: restoreDeleted
  test('restoreDeleted restores an ingredient from the pool', async () => {
    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
    await Ingredient.addOneSafe('TestIngredient', 'Not very tasty', 0.5, 100, [
      'toBeDeleted',
    ]);
    let loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(await loadedIngredient.safeDelete()).toBe(true);
    loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(await Ingredient.restoreDeleted('TestNonexistingIngredient')).toBe(
      false,
    );
    expect(await Ingredient.restoreDeleted('TestIngredient')).toBe(true);
    loadedIngredient = await Ingredient.findOne({ name: 'TestIngredient' });
    expect(loadedIngredient.active).toBe(true);
    expect(loadedIngredient.quantity).toBe(0);
    // Delete the test ingredient
    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  });
});
