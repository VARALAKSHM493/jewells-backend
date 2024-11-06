const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            name: { 
                type: String, 
                required: true 
            },
            description: { 
                type: String, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            },
            image: { 
                type: String, 
                required: true 
            }
        }
    ]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);