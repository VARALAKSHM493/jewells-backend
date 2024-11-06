const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateQuantity, deleteFromCart } = require('../controllers/cart');

router.post('/addtocart', addToCart);
router.get('/allcartitems', getCart);
router.post('/updatequantity', updateQuantity);
router.delete('/remove/:productId', deleteFromCart);

module.exports = router;
