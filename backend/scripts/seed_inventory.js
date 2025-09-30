// Script to seed sample products and inventory
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const MONGO_URI='mongodb+srv://arcforyou_db_user:Y6R9X8zF4WZORGF0@cluster0.ittpehl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  const products = [
    { name: 'Sample Product 1', description: 'First sample product', price: 19.99, category: 'Category A', image: '', },
    { name: 'Sample Product 2', description: 'Second sample product', price: 29.99, category: 'Category B', image: '', },
    { name: 'Sample Product 3', description: 'Third sample product', price: 39.99, category: 'Category C', image: '', },
  ];

  for (const prod of products) {
    let product = await Product.findOne({ name: prod.name });
    if (!product) {
      product = new Product(prod);
      await product.save();
    }
    let inventory = await Inventory.findOne({ product: product._id });
    if (!inventory) {
      inventory = new Inventory({ product: product._id, quantity: 100 });
      await inventory.save();
    } else {
      inventory.quantity = 100;
      await inventory.save();
    }
  }
  console.log('Sample inventory seeded!');
  mongoose.disconnect();
}

seed();
