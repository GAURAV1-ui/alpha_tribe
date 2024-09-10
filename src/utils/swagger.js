import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Alpha Tribe API',
    version: '1.0.0',
    description: 'API documentation for the Alpha Tribe application',
  },
  servers: [
    {
      url: 'https://alpha-tribe.onrender.com',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);