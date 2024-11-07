const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart'); // Import cart routes
const productRoutes = require('./routes/products'); // Import product routes
const wishlistRoutes = require('./routes/Wishlist'); // Import wishlist routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON bodies

// MongoDB connection using environment variable for secure DB URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/user", userRoutes); // User routes
app.use("/cart", cartRoutes); // Cart routes
app.use("/products", productRoutes); // Product routes
app.use("/wishlist", wishlistRoutes); // Wishlist routes

// Default route to check if the API is up and running
app.get('/', (req, res) => {
  res.send('API is working');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
