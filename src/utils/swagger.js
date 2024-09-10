import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Alpha Tribe API',
      version: '1.0.0',
      description: 'API documentation for Alpha Tribe'
    },
    servers: [
      {
        url: 'https://alpha-tribe.onrender.com',
      }
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

const swaggerMiddleware = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerMiddleware;
