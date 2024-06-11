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
//   afterAll(() => {
//     mongoose.connection.close();
//   });

  // === FUNCTION 1 === //

  describe('addOneSafe', () => {
    it('should not add a duplicate ingredient', async () => {
      // Arrange
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
      Ingredient.findOne.mockResolvedValue(null);

      // Act
      const result = await Ingredient.addOneSafe(name, 'Short name', 5, 50, ['short']);

      // Assert
      expect(Ingredient.findOne).toHaveBeenCalledWith({ name });
      expect(Ingredient.create).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });

  it('should add an ingredient with a unique name', async () => {
    // Arrange
    const name = 'UniqueIngredient';
    const description = 'A unique ingredient';
    const price = 10;
    const quantity = 100;
    const tags = ['unique', 'special'];

    // Mock findOne to return null, indicating no duplicates
    Ingredient.findOne.mockResolvedValue(null); 
    // To be replaced

    // Act
    const result = await Ingredient.addOneSafe(name, description, price, quantity, tags);

    // Assert
    expect(Ingredient.findOne).toHaveBeenCalledWith({ name });
    expect(Ingredient.create).toHaveBeenCalledWith({ name, description, price, quantity, tags });
    expect(result).toBe(true);
  });

});

// Test 4: add an ingredient ???

// === FUNCTION 2 === //


// Test 1: change the availability of an ingredient to a valid value

// Test 2: change the availability of an ingredient to an incorrect value


