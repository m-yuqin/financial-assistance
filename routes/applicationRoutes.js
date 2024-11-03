// routes/applicationRoutes.js

const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new application
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicant_nric:
 *                 type: string
 *                 example: "S1234567A"
 *               scheme_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "pending"
 *               outcome:
 *                 type: object
 *                 example: {}
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/applications', auth.verifyToken, applicationController.createApplication);


/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Retrieve a list of all applications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the application
 *                     example: 1
 *                   applicant_nric:
 *                     type: string
 *                     description: NRIC of the applicant
 *                     example: "S1234567A"
 *                   scheme_id:
 *                     type: integer
 *                     description: ID of the scheme applied for
 *                     example: 1
 *                   status:
 *                     type: string
 *                     description: Current status of the application
 *                     example: "processed"
 *                   outcome:
 *                     type: object
 *                     description: Outcome details for the application, stored in JSONB format
 *                     example: { "status": "granted", "details": "Additional Skillsfuture: $2000" }
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time when the application was created
 *                     example: "2024-11-03T10:15:30Z"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
// Get all applications
router.get('/applications', auth.verifyToken, applicationController.getAllApplications);

/**
 * @swagger
 * /applications/outcome:
 *   post:
 *     summary: Save the outcome of granting schemes to applicants
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               application_id:
 *                 type: integer
 *                 description: Application ID
 *                 example: 1
 *               outcome:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: "granted"
 *                   details:
 *                     type: string
 *                     example: "Additional Skillsfuture: $2000, Additional CDC vouchers: $1000, school_meal_vouchers: Daily School Meal Vouchers"
 *     responses:
 *       201:
 *         description: Outcome saved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
//Save outcome of granting of schemes to applicants
router.post('/applications/outcome', auth.verifyToken, applicationController.saveGrantOutcome);

module.exports = router;