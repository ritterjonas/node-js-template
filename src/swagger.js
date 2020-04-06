import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  // List of files to be processed.
  apis: ['./src/app/controllers/*.js'],
  // You can also set globs for your apis
  // e.g. './routes/*.js'
  basePath: '/',
  swaggerDefinition: {
    info: {
      description: 'Documentação da API',
      swagger: '2.0',
      title: 'Template Node',
      version: '1.0.0',
    },
  },
};

const specs = swaggerJsDoc(options);
export default specs;
