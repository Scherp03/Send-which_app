import mongoose, { mongo } from 'mongoose'

// Ingredient schema
const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
    },
    description: String,
    price: Number,
    quantity: Number,
    tags: [String],
    active: {
        type: Boolean,
        default: true,
    }
})  
// ==== METHODS ==== //

// Insert one order only if certain parameters are met
ingredientSchema.statics.addOneSafe = async function(name, description, price, quantity, tags) {
    // Test that it is not a duplicate
    let duplicateNamesList = await this.find({ name: name });
    if (duplicateNamesList.length > 0) {
        console.log("Duplicate ingredient: " + name);
        return false;
    }
    // Test that it is long enough
    if (name.length < 3) {
        console.log("Name too short");
        return false;
    }
    
    await this.create({ name: name, description: description, price: price, quantity: quantity, tags: tags });
    console.log("Ingredient added: " + name);
    return true;
}

// Change the availability of an ingredient, verify that the new availability is valid
ingredientSchema.methods.changeAvailability = function(newAvailability) {
    // Fail if basic check does not pass
    if (newAvailability < 0) {
        console.log("Invalid availability");
        return false;
    }
    this.quantity = newAvailability;
    console.log("Availability changed: " +this.name + ": " + this.quantity);
    return true;
}

// Add or remove a quantity of an ingredient in a safe way
ingredientSchema.methods.decreaseAvailability = function(amount) {
    // Fail if basic check does not pass
    // if (amount < 0) {
    //     console.log("Invalid availability");
    //     return false;
    // }
    if(this.quantity + amount < 0) {
        console.log("Ran out of (expected) ingredients: " + this.name);
        this.quantity = 0;
        return false;
    }
    this.quantity += amount;
    console.log("Availability changed: " + this.name + ": " + this.quantity);
    return true;
}

// Safe delete an ingredient: do not actually delete it, just set parameters
// This way information can be retrieved from the past
ingredientSchema.methods.safeDelete = function() {
    // Fail if already deleted;
    if (this.active == false) {
        console.log("Ingredient " + this.name + " found but already deleted");
        return false;
    }
    // Ok otherwise; set quantity to 0 for good measure
    this.active = false;
    this.quantity = 0;
    this.save();
    console.log("Ingredient deleted: " + this.name);
    return true;
}

// Restore a "deleted" ingredient
ingredientSchema.statics.restoreDeleted = async function(restoredName) {
    // Find one, case insensitive
    let ingredient = await this.findOne( { "name" : { $regex : new RegExp(restoredName, "i") } } );
    // Fail if ingredient not found
    if (!ingredient) {
        console.log("Failed to activate: Ingredient not found: " + restoredName);
        return false;
    }
    // Fail if ingredient is already active
    if (ingredient.active == true) {
        console.log("Failed to activate: ngredient already active: " + restoredName);
        return false;
    }
    // Otherwise, restore the ingredient
    ingredient.active = true;
    await ingredient.save();
    console.log("Ingredient restored: " + restoredName);
    return true;
}

// Export the models
const Order = mongoose.model('Ingredient', ingredientSchema);
export default Order;