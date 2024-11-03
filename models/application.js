// models/application.js

const pool = require('../config/db');

exports.getAllApplications = async () => {
  try {
    const result = await pool.query('SELECT * FROM applications');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.createApplication = async (data) => {
  const { applicant_nric, scheme_id, status, outcome } = data;

  try {
    const result = await pool.query(
      `INSERT INTO applications (applicant_nric, scheme_id, status, outcome)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [applicant_nric, scheme_id, status, outcome]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// models/application.js

exports.saveGrantOutcome = async (application_id, outcome) => {
    try {
      const result = await pool.query(
        `UPDATE applications SET outcome = $2, status = 'processed' WHERE id = $1 RETURNING *`,
        [application_id, outcome]
      );
  
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  };  