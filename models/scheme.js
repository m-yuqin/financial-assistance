const pool = require('../config/db');

exports.getAllSchemes = async () => {
  const result = await pool.query('SELECT * FROM schemes');
  return result.rows;
};


exports.getEligibleSchemes = async (nric) => {
  try {
    // Fetch applicant details using their NRIC
    const applicantQuery = `
      SELECT *
      FROM applicants
      WHERE nric = $1
    `;
    const applicantResult = await pool.query(applicantQuery, [nric]);
    
    if (applicantResult.rows.length === 0) {
      throw new Error('Applicant not found');
    }
    const applicant = applicantResult.rows[0];

    // Fetch household members for the applicant
    const householdQuery = `
      SELECT *
      FROM household_members
      WHERE applicant_nric = $1
    `;
    const householdResult = await pool.query(householdQuery, [nric]);
    const householdMembers = householdResult.rows;

    const { retrenchment_status, date_retrenched } = applicant;
    
    // Current date
    const currentDate = new Date();
    // One year ago from current date
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    // Query to match eligibility criteria for "Retrenchment Assistance Scheme"
    const schemeQuery = `
      SELECT *
      FROM schemes
      WHERE name = 'Retrenchment Assistance Scheme'
    `;
    const schemeResult = await pool.query(schemeQuery, []);
    const schemes = schemeResult.rows;

    // Check eligibility for the Retrenchment Assistance Scheme
    let eligibleSchemes = [];
    schemes.forEach((scheme) => {
      if (
        scheme.eligibility_criteria.retrenchment_status === 'recent' &&
        retrenchment_status.toLowerCase() === 'y' &&
        new Date(date_retrenched) >= oneYearAgo
      ) {
        // Add scheme if basic retrenchment criteria are met
        let schemeData = {
          scheme_name: scheme.name,
          eligible: true,
          benefits: { ...scheme.benefits } // Copy benefits to be modified if needed
        };

        // Additional check for school meal vouchers
        if (scheme.eligibility_criteria.school_meal_vouchers === 'children_attending_primary_school') {
          const hasSchoolGoingChildren = householdMembers.some(
            (member) =>
              member.relation.toLowerCase() === 'child' &&
              member.date_of_birth <= new Date(new Date().setFullYear(new Date().getFullYear() - 6)) &&
              member.date_of_birth >= new Date(new Date().getFullYear() - 12)
          );

          if (!hasSchoolGoingChildren) {
            delete schemeData.benefits.school_meal_vouchers;
          }
        }

        eligibleSchemes.push(schemeData);
      }
    });

    return eligibleSchemes;
  } catch (error) {
    throw error;
  }
};



exports.createScheme = async (schemeData) => { 
    const { name, description, eligibility_criteria, benefits } = schemeData; 
    const query = ` INSERT INTO schemes (name, description,eligibility_criteria, benefits) VALUES ($1, $2, $3, $4) RETURNING * `; 
    const values = [name, description,eligibility_criteria, benefits]; 
    const result = await pool.query(query, values); 
    return result.rows[0]; 
};