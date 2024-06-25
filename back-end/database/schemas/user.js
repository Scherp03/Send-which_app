import mongoose from 'mongoose';
import { Roles } from '../../../shared/userTypeDefinitions.js';

// Schema for the user
const userSchema = new mongoose.Schema(
  {
    // Actual name
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    // Username chosen by user
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      validate: [
        function (password) {
          return password.length >= 6;
        },
        'Password should be at least 6 characters long',
      ],
    },
    userType: {
      type: String,
      required: true,
      enum: Object.values(Roles),
    },
    notificationMail: String,
  },
  {
    timestamps: true,
  },
);

// ==== METHODS ==== //

// Search for a user by name (case insensitive)
userSchema.statics.findByNameInsensitive = function (queryName) {
  return this.find({ name: new RegExp(queryName, 'i') });
};

// The same, with query instead of find
// It must be used as User.where.byName("___")
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, 'i') });
};

// ==== VIRTUALS ==== //
userSchema.virtual('fullCredentials').get(function () {
  return `${this.name} ${this.email}`;
});

// Export the model
const User = mongoose.model('User', userSchema);
export default User;
