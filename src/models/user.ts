// models/User.ts
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure email is unique
  },
  phoneNumber: {
    type: String,
    required: [true, "Contact number is required"],
    unique: true, // Ensure contact number is unique
  },
  nationality: {
    type: String,
  },
  investmentBudget: {
    type: String,
    required: true,
  },
  preferredUnit: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: String,
    },
    lon: {
      type: String,
    },
  },
  browserInfo: {
    userAgent: {
      type: String,
    },
    language: {
      type: String,
    },
    platform: {
      type: String,
    },
    cookiesEnabled: {
      type: Boolean,
    },
  },
  ip: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
