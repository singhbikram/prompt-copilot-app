const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');
paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

exports.createStripePaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: 'Stripe error', details: err.message });
  }
};

exports.createPayPalPayment = (req, res) => {
  const { amount, currency } = req.body;
  const create_payment_json = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    transactions: [{
      amount: { total: amount, currency },
      description: 'E-commerce Payment'
    }],
    redirect_urls: {
      return_url: 'http://localhost:5000/payment/paypal/success',
      cancel_url: 'http://localhost:5000/payment/paypal/cancel'
    }
  };
  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      res.status(500).json({ error: 'PayPal error', details: error });
    } else {
      res.json({ payment });
    }
  });
};

// Apple Pay and Google Pay are typically handled on the frontend using Stripe or other gateways
// For credit/debit cards, use Stripe or PayPal endpoints
