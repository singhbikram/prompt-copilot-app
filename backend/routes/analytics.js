const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/stats', analyticsController.getStats);
router.post('/track', analyticsController.trackEvent);

module.exports = router;
