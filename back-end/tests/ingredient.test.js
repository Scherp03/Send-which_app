import mongoose from 'mongoose';
import Ingredient from '../database/schemas/ingredient';

jest.mock('mongoose', () => {
  const originalModule = jest.requireActual('mongoose');
  return {
    ...originalModule,
    model: jest.fn().mockImplementation((name, schema) => {
      const Model = originalModule.model(name, schema);
      Model.findOne = jest.fn();
      Model.create = jest.fn();
      return Model;
    }),
  };
});

describe('Ingredient model statics', () => {
  beforeEach(() => {
    Ingredient.findOne.mockReset();
    Ingredient.create.mockReset();
    Ingredient.findOne.mockImplementation(async (query) => {
      if (query.name === 'IngredientToDelete') {
        return { name: 'IngredientToDelete', description: 'Ingredient to delete', price: 5, quantity: 50, tags: ['foo'], safeDelete: jest.fn().mockResolvedValue({ deleted: true, quantity: 0 }) };
      }
      return null;
    });
    Ingredient.create.mockImplementation(async (ingredient) => ingredient);
  });
  // === FUNCTION 1 === //
  describe('addOneSafe', () => {
    it('should not add a duplicate ingredient', async () => {
      // Simulate an existing ingredient
      const name = 'DuplicateIngredient';
      const duplicateIngredient = { _id: '507f1f77bcf86cd799439011', name };
      Ingredient.findOne.mockResolvedValue(duplicateIngredient);

      // Act 
      const result = await Ingredient.addOneSafe(name, 'Duplicate description', 5, 50, ['duplicate']);

      // Assert
      expect(Ingredient.findOne).toHaveBeenCalledWith({ name });
      expect(Ingredient.create).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });

    
    it('should not add an ingredient with a name that is too short', async () => {
      // Arrange
      const name = 'No';
      // Ingredient.findOne.mockResolvedValue(null);

      // Act
      const result = await Ingredient.addOneSafe(name, 'Short name', 5, 50, ['short']);

      // Assert
      expect(Ingredient.findOne).toHaveBeenCalledWith({ name });
      expect(Ingredient.create).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  

    it('should not add an ingredient with an invalid quantity or price', async () => {
    // Arrange
    const name = 'InvalidQuantityIngredient';
    const description = 'An uncertain amount of ingredient';
    const price1 = 10.99;     // Valid price
    const price2 = [10.99];
    const price3 = -10.99;
    const quantity1 = [100];
    const quantity2 = -100;
    const quantity3 = '1000'
    const quantity4 = 0;    // Valid quantity
    const quantity5 = 100.5;
    const quantity6 = 100;   // Valid quantity
    const tags = ['foo'];

    // Suppose that the other tests are passed
    Ingredient.findOne.mockResolvedValue(null); 


    // Act
    const result1 = await Ingredient.addOneSafe(name + '1', description, price1, quantity1, tags);
    const result2 = await Ingredient.addOneSafe(name + '2', description, price1, quantity2, tags);
    const result3 = await Ingredient.addOneSafe(name + '3', description, price1, quantity3, tags);
    const result4 = await Ingredient.addOneSafe(name + '4', description, price1, quantity4, tags);
    const result5 = await Ingredient.addOneSafe(name + '5', description, price1, quantity5, tags);
    const result6 = await Ingredient.addOneSafe(name + '6', description, price1, quantity6, tags);
    const result7 = await Ingredient.addOneSafe(name + '7', description, price2, quantity6, tags);
    const result8 = await Ingredient.addOneSafe(name + '8', description, price3, quantity6, tags);

    // Assert
    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(true);
    expect(result5).toBe(false);
    expect(result6).toBe(true);
    expect(result7).toBe(false);
    expect(result8).toBe(false);
    });

    it('should add an ingredient with a unique and long enough name', async () => {
    // Arrange
    const name = 'UniqueIngredient';
    const description = 'A unique ingredient';
    const price = 10;
    const quantity = 100;
    const tags = ['unique', 'special'];

    // Suppose that the name is unique
    Ingredient.findOne.mockResolvedValue(null); 


    // Act
    const result = await Ingredient.addOneSafe(name, description, price, quantity, tags);

    // const confirmation = await Ingredient.findOne({ name });

    // Assert
    expect(Ingredient.findOne).toHaveBeenCalledWith({ name });
    expect(Ingredient.create).toHaveBeenCalledWith({ name, description, price, quantity, tags });
    expect(result).toBe(true);
    // expect(confirmation.name).toBe(name);
    });
  });
  // === FUNCTION 2 === //
  describe('safeDelete', () => {
    it('should not really delete an ingredient', async () => {
      // Arrange
      await Ingredient.addOneSafe('IngredientToDelete', 'Ingredient to delete', 5, 50, ['foo']);

      // Act
      const testIngredient = await Ingredient.findOne({ name: 'IngredientToDelete' });
      console.log(testIngredient);
      testIngredient = await testIngredient.safeDelete();

      // Assert
      expect(testIngredient.deleted).toBe(true);
      expect(testIngredient.quantity).toBe(0);
    });
  });

  // === FUNCTION 3 === //

  // Test 1: change the availability of an ingredient to a valid value

  // Test 2: change the availability of an ingredient to an incorrect value 
});