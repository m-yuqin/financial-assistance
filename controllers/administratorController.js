const administratorModel = require('../models/administrator');

exports.createAdministrator = async (req, res) => {
  try {
    const administrator = await administratorModel.createAdministrator(req.body);
    res.status(201).json({
      message: 'Administrator created successfully',
      data: administrator,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating administrator', error: error.detail });
  }
};