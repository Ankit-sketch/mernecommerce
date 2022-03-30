const User = require("./userModal");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [8, "Price length can not exceed more than 8 character"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  category: { type: String, required: true },
  stock: {
    type: Number,
    required: [true, "Stock cannot exceed more than 4 digit"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      rating: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
