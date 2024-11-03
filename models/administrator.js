const pool = require('../config/db');
const bcrypt = require('bcryptjs');

exports.createAdministrator = async (data) => {
  const { name, email, password } = data;

  // Hash the password before storing
  const password_hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO administrators (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password_hash]
  );

  return result.rows[0];
};

// Function to find an administrator by email
exports.findAdminByEmail = async (email) => {
    const result = await pool.query(
      'SELECT * FROM administrators WHERE email = $1',
      [email]
    );

    // Check if a record was found
    if (result.rows.length === 0) {
        return null; // Return null if no administrator found
    }
  
    return result.rows[0]; // Return the found administrator or undefined if not found
 };
