const express = require('express');
const administratorController = require('../controllers/administratorController');
const router = express.Router();

const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const { findAdminByEmail } = require('../models/administrator'); 
require('dotenv').config();

/**
 * @swagger
 * /administrators:
 *   post:
 *     summary: Add a new administrator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: sysadmin
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: "!sysAdmin"
 *     responses:
 *       201:
 *         description: Administrator created successfully
 *       500:
 *         description: Internal server error
 */
// Route for adding a new administrator
router.post('/administrators', administratorController.createAdministrator);

/**
 * @swagger
 * /administrators/login:
 *   post:
 *     summary: Login as an administrator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: "!sysAdmin"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
// Login endpoint for administrators
router.post('/administrators/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the administrator in the database
      const admin = await findAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, admin.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use a strong secret
  
      // Send the token back to the client
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;