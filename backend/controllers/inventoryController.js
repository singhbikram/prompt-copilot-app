
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const ExcelJS = require('exceljs');

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product');
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.uploadInventoryExcel = async (req, res) => {
  // Assume file is uploaded and available as req.file.path
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.csv.readFile(req.file.path);
    const worksheet = workbook.worksheets[0];
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      const [name, description, price, category, image, stock] = row.values.slice(0);
      // Find or create product
      let product = await Product.findOne({ name });
      if (!product) {
        product = new Product({ name, description, price, category, image });
        await product.save();
      }
      // Create or update inventory
      let inventory = await Inventory.findOne({ product: product._id });
      if (!inventory) {
        inventory = new Inventory({ product: product._id, quantity: stock });
      } else {
        inventory.quantity = stock;
      }
      await inventory.save();
    }
    res.json({ message: 'Inventory uploaded and saved to DB (CSV)' });
  } catch (err) {
    res.status(500).json({ error: 'CSV upload error', details: err.message });
  }
};

exports.generateInventoryReport = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product');
    // Generate chart data and forecasting (placeholder)
    const report = {
      totalProducts: inventory.length,
      lowStock: inventory.filter(i => i.quantity < 10),
      // Add chart/forecast logic here
    };
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Report error', details: err.message });
  }
};
