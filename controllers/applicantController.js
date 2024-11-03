const applicantModel = require('../models/applicant');

exports.createApplicant = async (req, res) => {
  try {
    const applicant = await applicantModel.createApplicant(req.body);
    res.status(201).json(applicant);
  } catch (error) {
    res.status(400).json({ message: 'Error creating applicant', error });
  }
};

exports.getApplicants = async (req, res) => {
  try {
    const applicants = await applicantModel.getAllApplicants();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applicants', error });
  }
};
