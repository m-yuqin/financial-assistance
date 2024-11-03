exports.checkEligibility = (applicant, schemeCriteria) => {
    const eligible = 
      applicant.employment_status === schemeCriteria.employment_status &&
      // Add other conditions as needed
      true;
    return eligible;
  };
  