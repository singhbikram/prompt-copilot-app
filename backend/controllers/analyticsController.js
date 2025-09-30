// Basic analytics controller
exports.getStats = async (req, res) => {
  try {
    const Order = require('../models/Order');
    const User = require('../models/User');
    const Inventory = require('../models/Inventory');

    // Total sales: sum of all order totals
    const orders = await Order.find();
    const sales = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    // Total users
    const users = await User.countDocuments();

    // Total inventory items
    const inventory = await Inventory.countDocuments();

    res.json({
      sales,
      users,
      inventory
    });
  } catch (err) {
    res.status(500).json({ sales: 0, users: 0, inventory: 0, error: err.message });
  }
};

exports.trackEvent = async (req, res) => {
  // Placeholder: implement event tracking logic
  res.json({ message: 'Event tracked' });
};
