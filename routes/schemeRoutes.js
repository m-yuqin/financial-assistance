const express = require('express');
const schemeController = require('../controllers/schemeController');
const router = express.Router();
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /schemes:
 *   post:
 *     summary: Create a new scheme
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Retrenchment Assistance Scheme"
 *               description:
 *                 type: string
 *                 example: "Financial assistance for retrenched workers"
 *               eligibility_criteria:
 *                 type: object
 *                 properties:
 *                   retrenchment_status:
 *                     type: string
 *                     example: "recent"
 *                   school_meal_vouchers:
 *                     type: string
 *                     example: "children_attending_primary_school"
 *               benefits:
 *                 type: object
 *                 properties:
 *                   skillsfuture_credits:
 *                     type: string
 *                     example: "Additional SkillsFuture credits"
 *                   cdc_vouchers:
 *                     type: string
 *                     example: "Additional CDC vouchers"
 *                   school_meal_vouchers:
 *                     type: string
 *                     example: "Daily school meal vouchers"
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 example: "NOW()"
 *     responses:
 *       201:
 *         description: Scheme created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
// Create a new scheme 
router.post('/schemes', auth.verifyToken, schemeController.createScheme);

/**
 * @swagger
 * /schemes:
 *   get:
 *     summary: Retrieve a list of all schemes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all schemes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the scheme
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Name of the scheme
 *                     example: "Retrenchment Assistance Scheme"
 *                   description:
 *                     type: string
 *                     description: Description of the scheme
 *                     example: "Financial assistance for retrenched workers"
 *                   eligibility_criteria:
 *                     type: object
 *                     description: Eligibility criteria for the scheme
 *                     example: { "retrenchment_status": "y", "school_meal_vouchers": "children_attending_primary_school" }
 *                   benefits:
 *                     type: object
 *                     description: Benefits provided by the scheme
 *                     example: { "skillsfuture_credits": "Additional SkillsFuture credits", "cdc_vouchers": "Additional CDC vouchers", "school_meal_vouchers": "Daily school meal vouchers" }
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time when the scheme was created
 *                     example: "2024-11-03T10:15:30Z"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
// Get all schemes
router.get('/schemes', auth.verifyToken, schemeController.getSchemes);

/**
 * @swagger
 * /schemes/eligible:
 *   get:
 *     summary: Get eligible schemes for an applicant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: applicant
 *         in: query
 *         required: true
 *         description: NRIC of the applicant
 *         schema:
 *           type: string
 *           example: "S1234567A"
 *     responses:
 *       200:
 *         description: A list of eligible schemes for the applicant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the scheme
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Name of the scheme
 *                     example: "Retrenchment Assistance Scheme"
 *                   description:
 *                     type: string
 *                     description: Description of the scheme
 *                     example: "Financial assistance for retrenched workers"
 *                   eligibility_criteria:
 *                     type: object
 *                     description: Eligibility criteria for the scheme
 *                     example: { "retrenchment_status": "y", "school_meal_vouchers": "children_attending_primary_school" }
 *                   benefits:
 *                     type: object
 *                     description: Benefits provided by the scheme
 *                     example: { "skillsfuture_credits": "Additional SkillsFuture credits", "cdc_vouchers": "Additional CDC vouchers", "school_meal_vouchers": "Daily school meal vouchers" }
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time when the scheme was created
 *                     example: "2024-11-03T10:15:30Z"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
// Get eligible schemes for an applicant
router.get('/schemes/eligible', auth.verifyToken, schemeController.getEligibleSchemes);

module.exports = router;