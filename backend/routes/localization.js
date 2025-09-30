const express = require('express');
const router = express.Router();
const localizationController = require('../controllers/localizationController');


router.get('/', localizationController.getTranslations);
router.post('/', localizationController.addTranslation);

module.exports = router;
