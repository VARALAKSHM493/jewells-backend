const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');

// Get all wishlist items
router.get('/allwishlistitems', getWishlist);

// Add product to wishlist
router.post('/addtowishlist', addToWishlist);

// Remove product from wishlist
router.delete('/removefromwishlist/:productId', removeFromWishlist);

module.exports = router;
