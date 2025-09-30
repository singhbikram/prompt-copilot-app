const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');


router.get('/history', chatbotController.getChatHistory);
router.post('/ask', chatbotController.askAMA);

module.exports = router;
