const Product = require('../models/products');

const addproduct = async (req, res) => {
    try {
        const { name, description, image, price } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required." });
        }

        const product = new Product({
            name,
            description,
            image: image || null,
            price: price || 0,
        });

        const createproduct = await product.save();
        return res.status(201).json({
            message: "Product added successfully",
            product: createproduct,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

const getAllproducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            totalproducts: products.length,
            products,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addproduct,
    getAllproducts,
};
