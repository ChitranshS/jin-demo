const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Robotware } = require('./db');

const app = express();

// Body-parser middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://proto_one:TzGiMPrGyevwUZ7E@cluster0.y8n2ncf.mongodb.net/').then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Product model
const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

// Routes
app.post('/products', (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save()
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err));
});

app.get('/products', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json(err));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
