const mongoose = require('mongoose');

const localizationSchema = new mongoose.Schema({
  key: String,
  translations: {
    en: String,
    es: String,
    fr: String,
    // Add more languages as needed
  }
});

module.exports = mongoose.model('Localization', localizationSchema);
