const Wishlist = require('../models/wishlist');

// Add product to wishlist
const addToWishlist = async (req, res) => {
    const { productId, name, description, price, image } = req.body;

    if (!productId || !name || !description || !price || !image) {
        return res.status(400).json({ error: 'Product data is incomplete' });
    }

    try {
        let wishlist = await Wishlist.findOne();
        if (!wishlist) {
            wishlist = new Wishlist({ products: [] });
        }

        // Check if the product already exists in the wishlist
        const existingProduct = wishlist.products.find(item => item.productId === productId);
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        wishlist.products.push({ productId, name, description, price, image });
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error adding to wishlist", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get wishlist items
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne();
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist is empty" });
        }
        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error fetching wishlist", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
    const { productId } = req.params;

    try {
        let wishlist = await Wishlist.findOne();
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist is empty' });
        }

        wishlist.products = wishlist.products.filter(item => item.productId !== productId);
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};
