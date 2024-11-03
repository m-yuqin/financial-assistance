const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Generate a 32-byte random secret and encode it in base64
const jwtSecret = crypto.randomBytes(32).toString('base64');

// Specify the path to your .env file
const envPath = path.join(__dirname, '.env');

// Append or create JWT_SECRET in the .env file
fs.appendFileSync(envPath, `\nJWT_SECRET=${jwtSecret}\n`, 'utf8');

console.log('JWT_SECRET has been generated and saved to .env');