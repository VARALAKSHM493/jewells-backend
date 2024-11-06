const Cart = require('../models/cart');

const addToCart = async (req, res) => {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Product array is required' });
    }

    try {
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ products: [] });
        }

        for (const { productId, quantity, name, description, price, image } of products) {
            if (!productId) {
                return res.status(400).json({ error: 'Product ID is required for each item' });
            }

            const existingProduct = cart.products.find(item => item.productId === productId);

            if (existingProduct) {
                existingProduct.quantity += (quantity || 1);
            } else {
                cart.products.push({ productId, quantity: quantity || 1, name, description, price, image });
            }
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error adding to cart", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateQuantity = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const existingProduct = cart.products.find(item => item.productId === productId);
        if (existingProduct) {
            existingProduct.quantity = quantity;
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty.' });
        }

        cart.products = cart.products.filter(item => item.productId !== productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error deleting from cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    deleteFromCart
};
