const express = require('express');
const applicantController = require('../controllers/applicantController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * /applicants:
 *   post:
 *     summary: Create a new applicant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nric:
 *                 type: string
 *                 example: "S1234567A"
 *               name:
 *                 type: string
 *                 example: "Mary"
 *               employment_status:
 *                 type: string
 *                 example: "unemployed"
 *               retrenchment_status:
 *                 type: string
 *                 example: "y"
 *               date_retrenched:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-15"
 *               marital_status:
 *                 type: string
 *                 example: "married"
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: "1985-05-20"
 *               household_size:
 *                 type: integer
 *                 example: 4
 *               household_members:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nric:
 *                       type: string
 *                       example: "C1234567B"
 *                     name:
 *                       type: string
 *                       example: "Jason"
 *                     relation:
 *                       type: string
 *                       example: "child"
 *                     date_of_birth:
 *                       type: string
 *                       format: date
 *                       example: "2015-05-10"
 *                     employment_status:
 *                       type: string
 *                       example: "student"
 *                 example:
 *                   - nric: "C1234567B"
 *                     name: "Jason"
 *                     relation: "child"
 *                     date_of_birth: "2015-05-10"
 *                     employment_status: "student"
 *                   - nric: "C1234568B"
 *                     name: "Janet"
 *                     relation: "child"
 *                     date_of_birth: "2017-09-20"
 *                     employment_status: "student"
 *     responses:
 *       201:
 *         description: Applicant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 message:
 *                   type: string
 *                   example: "Applicant created successfully"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/applicants', auth.verifyToken, applicantController.createApplicant);

/**
 * @swagger
 * /applicants:
 *   get:
 *     summary: Retrieve a list of applicants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of applicants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nric:
 *                     type: string
 *                   name:
 *                     type: string
 *                   employment_status:
 *                     type: string
 *                   retrenchment_status:
 *                     type: string
 *                   date_retrenched:
 *                     type: string                   
 *                   marital_status:
 *                     type: string
 *                   date_of_birth:
 *                     type: string
 *                   household_size:
 *                     type: integer
 *                   created_at: 
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/applicants', auth.verifyToken, applicantController.getApplicants);

module.exports = router;
