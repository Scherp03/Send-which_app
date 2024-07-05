import mongoose from 'mongoose'

// Schema for the user
const userSchema = new mongoose.Schema({
    // Actual name
    firstName :  { 
        type: String,
        required: true,
    },
    lastName:   { 
        type: String,
        required: true,
    },
    // Username chosen by user
    username:  { 
        type: String,
        required: true,
        lowercase: true
    }, 
    // Removed: "unique: true" as agreed
    email:  {
        type: String,
        required: true,
        lowercase: true
    },
    password:   {
        type: String,
        required: true
    },
    notificationMail: String
    },
    {
        timestamps: true
    }
)

// ==== METHODS ==== //

// Search for a user by name (case insensitive)
userSchema.statics.findByNameInsensitive = function(queryName) {
    return this.find({ name: new RegExp(queryName, 'i') });
}

// ==== VIRTUALS ==== //
userSchema.virtual("fullCredentials").get(function() {
    return `${this.name} ${this.email}`;
})

// Export the model
const User =  mongoose.model('User', userSchema);
export default User;
