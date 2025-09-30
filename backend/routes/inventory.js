const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', inventoryController.getInventory);
router.post('/upload', upload.single('file'), inventoryController.uploadInventoryExcel);
router.get('/report', inventoryController.generateInventoryReport);

module.exports = router;
