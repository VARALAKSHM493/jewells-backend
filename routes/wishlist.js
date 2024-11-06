const express = require('express');
const router = express.Router();
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/Wishlist');

// Route to add product to wishlist
router.post('/addtowishlist', addToWishlist);

// Route to get all wishlist items
router.get('/allwishlistitems', getWishlist);

// Route to remove product from wishlist
router.delete('/removeFromWishlist/:productId', removeFromWishlist);

module.exports = router;
