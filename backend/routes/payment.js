const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Stripe
router.post('/stripe', paymentController.createStripePaymentIntent);

// PayPal
router.post('/paypal', paymentController.createPayPalPayment);

// Apple Pay and Google Pay handled via Stripe on frontend

module.exports = router;
