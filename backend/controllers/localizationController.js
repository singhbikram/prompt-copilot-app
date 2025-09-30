
const Localization = require('../models/Localization');

exports.getTranslations = async (req, res) => {
  try {
    const translations = await Localization.find();
    res.json(translations);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addTranslation = async (req, res) => {
  try {
    const { key, translations } = req.body;
    const loc = new Localization({ key, translations });
    await loc.save();
    res.status(201).json(loc);
  } catch (err) {
    res.status(500).json({ error: 'Add translation error', details: err.message });
  }
};
