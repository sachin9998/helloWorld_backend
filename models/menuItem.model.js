import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },

  isDrink: {
    type: Boolean,
    default: false,
  },

  ingredients: {
    type: [String],
    required: true,
  },

  num_sales: {
    type: Number,
    default: 0,
  },
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
