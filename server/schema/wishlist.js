const mongoose = require('mongoose');

const Schema = mongoose.Schema
const WishlistSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Wishlist', WishlistSchema)