const Wishlist = require('../models/wishlist');

// Get all wishlist items
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne();
    if (!wishlist) {
      return res.status(200).json({ wishlist: { products: [] } });
    }
    return res.status(200).json({ wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return res.status(500).json({ message: 'Failed to fetch wishlist.' });
  }
};

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  const { productId, name, description, price, image } = req.body;

  if (!productId || !name || !description || !price || !image) {
    return res.status(400).json({ message: 'Missing required product information.' });
  }

  try {
    let wishlist = await Wishlist.findOne();
    if (!wishlist) {
      wishlist = new Wishlist({
        products: [{ productId, name, description, price, image }],
      });
      await wishlist.save();
      return res.status(201).json({ message: 'Product added to wishlist.' });
    }

    const existingProduct = wishlist.products.find(item => item.productId === productId);
    if (existingProduct) {
      return res.status(400).json({ message: 'Product is already in wishlist.' });
    }

    wishlist.products.push({ productId, name, description, price, image });
    await wishlist.save();
    return res.status(201).json({ message: 'Product added to wishlist.' });

  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return res.status(500).json({ message: 'Failed to add product to wishlist.' });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne();
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found.' });
    }

    wishlist.products = wishlist.products.filter(item => item.productId !== productId);
    await wishlist.save();
    return res.status(200).json({ message: 'Product removed from wishlist.' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return res.status(500).json({ message: 'Failed to remove product from wishlist.' });
  }
};
