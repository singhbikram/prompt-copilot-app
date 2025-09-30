
const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

exports.getNotifications = async (req, res) => {
  // TODO: Implement authentication middleware
  try {
    const notifications = await Notification.find({ user: req.user.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.sendLowInventoryAlerts = async (req, res) => {
  try {
    const threshold = req.body.threshold || 10;
    const lowInventory = await Inventory.find({ quantity: { $lt: threshold } }).populate('product');
    if (lowInventory.length === 0) {
      return res.json({ message: 'No low inventory items.' });
    }

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Twilio setup
    const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    for (const item of lowInventory) {
      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.body.email || process.env.ALERT_EMAIL,
        subject: 'Low Inventory Alert',
        text: `Product ${item.product.name} is low in stock: ${item.quantity}`
      });

      // Send SMS
      if (req.body.phone || process.env.ALERT_PHONE) {
        await twilioClient.messages.create({
          body: `Product ${item.product.name} is low in stock: ${item.quantity}`,
          from: process.env.TWILIO_PHONE,
          to: req.body.phone || process.env.ALERT_PHONE
        });
      }
    }
    res.json({ message: 'Low inventory alerts sent.' });
  } catch (err) {
    res.status(500).json({ error: 'Alert error', details: err.message });
  }
};
