const schemeModel = require('../models/scheme');
const applicantModel = require('../models/applicant');

exports.getSchemes = async (req, res) => {
  try {
    const schemes = await schemeModel.getAllSchemes();
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schemes', error });
  }
};

exports.getEligibleSchemes = async (req, res) => {
  try {
    const applicantNric = req.query.applicant;
    const schemes = await schemeModel.getEligibleSchemes(applicantNric);
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching eligible schemes', error });
  }
};


exports.createScheme = async (req, res) => { 
    try { 
        const scheme = await schemeModel.createScheme(req.body); 
        res.status(201).json({ message: 'Scheme created successfully', data: scheme }); 
    } catch (error) { 
        res.status(400).json({ message: 'Error creating scheme', error }); 
    } 
};