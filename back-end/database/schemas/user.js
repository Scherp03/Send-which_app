import mongoose from 'mongoose'

// Schema for the user
const userSchema = new mongoose.Schema({
    hash:   String,
    name :  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
        lowercase: true
    },
    created:    {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    password:   {
        type: String,
        required: true,
        validate: [
            function(password) {
                return password.length >= 6;
            },
            "Password should be at least 6 characters long"
        ]
    },
    credentials:    String,
    notificationMail: String
})


// ==== METHODS ==== //


// Create hash
userSchema.methods.getHash = function() {
  // TODO!
}
// Search for a user by name (case insensitive)
userSchema.statics.findByNameInsensitive = function(queryName) {
    return this.find({ name: new RegExp(queryName, 'i') });
}

// The same, with query instead of find
// It must be used as User.where.byName("___")
userSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') });
}

// ==== VIRTUALS ==== //
userSchema.virtual("fullCredentials").get(function() {
    return `${this.name} ${this.email}`;
})

// Hash
userSchema.virtual("Hash").get(function() {
    return `${this.name} ${this.email}`; // To be greatly improved
})

<<<<<<< HEAD:back-end/database/Schemas/user.js
module.exports = userSchema;
added error
=======
export default mongoose.model("User0", userSchema);
>>>>>>> 2d17dcd3e95d8bf7fd4336dedbecb8aa6dd8f2b9:back-end/database/schemas/user.js
