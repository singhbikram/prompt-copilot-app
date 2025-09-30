const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Home');
});


router.use('/user', require('./user'));
router.use('/products', require('./product'));
router.use('/cart', require('./cart'));
router.use('/orders', require('./order'));
router.use('/inventory', require('./inventory'));
router.use('/notifications', require('./notification'));
router.use('/chatbot', require('./chatbot'));
router.use('/localization', require('./localization'));
router.use('/payment', require('./payment'));

module.exports = router;
