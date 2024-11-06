const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let products = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  price: Math.floor(Math.random() * 200) + 50,
  image: `https://via.placeholder.com/200?text=Product+${index + 1}`
}));

let cart = [];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get all cart items and totals
app.get('/api/cart', (req, res) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ cart, totalItems, totalPrice });
});

// Add or update item quantity in the cart
app.post('/api/cart', (req, res) => {
  const { productId, quantityChange } = req.body;
  const product = products.find(p => p.id === productId);

  if (product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = Math.max(0, existingItem.quantity + quantityChange);
      if (existingItem.quantity === 0) {
        cart = cart.filter(item => item.id !== product.id);
      }
    } else if (quantityChange > 0) {
      cart.push({ ...product, quantity: quantityChange });
    }
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Remove a specific item from the cart
app.delete('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  cart = cart.filter(item => item.id !== productId);
  res.status(200).json(cart);
});

// Clear the entire cart
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.status(200).json({ message: 'Cart cleared' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
