import mongoose from 'mongoose';
import Sandwich from '../database/schemas/sandwich';
import Ingredient from '../database/schemas/ingredient';
import StatSandwich from '../database/schemas/statisticSandwich';

const uri = "mongodb+srv://WritingPurposeUser:FpKwCBXmZh7uSvfA@test1.sdy9unk.mongodb.net/?retryWrites=true&w=majority&appName=Test1";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions);

// Function to have a database with some basic ingredients and a sandwich
async function populateDatabase () {
    let ingredient1 = new Ingredient({ name: "Tomato", price: 1, quantity: 10, tags: ["vegetarian", "vegan", 'toBeDeleted'] });
    let ingredient2 = new Ingredient({ name: "Cheese", price: 1.5, quantity: 20, tags: ["vegetarian", "lactose", 'toBeDeleted'] });
    let ingredient3 = new Ingredient({ name: "Ham", price: 2, quantity: 50, tags: ["meat", 'toBeDeleted'] });
    await Ingredient.insertMany([ingredient1, ingredient2, ingredient3]);
    let sandwich1 = new Sandwich({ breadType: "White", ingredientsID: [ingredient1._id, ingredient2._id]});
    await sandwich1.save();
    return sandwich1._id;
}

// Function 1: addStatistic
test('addStatistic takes a sandwich and makes a statistic out of it', async () => {
    let sandwichID = await populateDatabase();
    let sandwich1 = await Sandwich.findOne({ _id: sandwichID });
    await sandwich1.addStatistic();
    let stat = await StatSandwich.findOne({ ingredientsHash: sandwich1.getHash() });
    expect(stat.timesSold).toBe(1);
    await sandwich1.addStatistic();
    stat = await StatSandwich.findOne({ ingredientsHash: sandwich1.getHash() });
    expect(stat.timesSold).toBe(2);

    await Ingredient.deleteMany({ name: 'UniqueIngredient' });
});

