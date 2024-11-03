// controllers/applicationController.js

const applicationModel = require('../models/application');

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await applicationModel.getAllApplications();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const application = await applicationModel.createApplication(req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error creating application', error });
  }
};

// controllers/applicationController.js

exports.saveGrantOutcome = async (req, res) => {
    try {
      const { application_id, outcome } = req.body;
  
      if (!['granted', 'not granted'].includes(outcome.status)) {
        return res.status(400).json({ message: 'Invalid outcome status' });
      }
  
      const result = await applicationModel.saveGrantOutcome(application_id, outcome);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error saving grant outcome', error });
    }
  };  