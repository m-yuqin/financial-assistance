// config/swagger.js

// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Financial Assistance Application System',
//       version: '1.0.0',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000/api', // Base URL
//       },
//     ],
//   },
//   apis: ['./routes/*.js'], // Path to the API routes
// };

// const specs = swaggerJsdoc(options);

// module.exports = { swaggerUi, specs };

// config/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Financial Assistance Application System',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };