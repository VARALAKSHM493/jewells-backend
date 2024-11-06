const express = require('express');
const router = express.Router();
const { addproduct, getAllproducts } = require('../controllers/products');

router.post('/addproducts', addproduct);
router.get('/all', getAllproducts);

module.exports = router;
