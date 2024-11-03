const pool = require('../config/db');


exports.createApplicant = async (data) => {
  const { nric, name, employment_status, marital_status, date_of_birth, household_size, date_retrenched, retrenchment_status, household_members } = data;

  // Begin transaction
  await pool.query('BEGIN');

  try {
    // Insert applicant details
    const result = await pool.query(
      `INSERT INTO applicants (nric, name, employment_status, marital_status, date_of_birth, household_size, date_retrenched, retrenchment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [nric, name, employment_status, marital_status, date_of_birth, household_size, date_retrenched, retrenchment_status]
    );

    // Insert household members
    for (const member of household_members) {
      await pool.query(
        `INSERT INTO household_members (nric, applicant_nric, name, relation, date_of_birth, employment_status)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [member.nric, nric, member.name, member.relation, member.date_of_birth, member.employment_status]
      );
    }

    // Commit transaction
    await pool.query('COMMIT');

    return result.rows[0];
  } catch (error) {
    // Rollback transaction on error
    await pool.query('ROLLBACK');
    throw error;
  }
};



exports.getAllApplicants = async () => {
  const result = await pool.query('SELECT * FROM applicants');
  return result.rows;
};
