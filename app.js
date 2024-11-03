const express = require('express');
const applicantRoutes = require('./routes/applicantRoutes');
const administratorRoutes = require('./routes/administratorRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const { swaggerUi, specs } = require('./config/swagger');
const app = express();

app.use(express.json());
// Swagger UI 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// API Routes
app.use('/api', applicantRoutes); // Apply routes
app.use('/api', administratorRoutes); // Administrator routes
app.use('/api', schemeRoutes);
app.use('/api', applicationRoutes);

module.exports = app;