const express = require('express')

const router = express.Router()

const BooksController = require('../controllers/book.controller')
const WishlistController = require('../controllers/wishlist.controller')

router.get('/api/v1/search', BooksController.book)
router.get('/api/v1/wishlist',WishlistController.getWishlist)
router.post('/api/v1/wishlist', WishlistController.postWishlist)

module.exports = router