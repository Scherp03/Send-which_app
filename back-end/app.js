import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

/* Routes */
const app = express();

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';

app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

/* Quick check if it's working */
app.get('/', (req, res) => {
  res.status(200).send('Welcome to homepage!');
});

/* Swagger setup */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Send-which API',
      description: "Documentation for Send-which's REST APIs",
      version: '1.0.0',
    },
  },
  apis: ['./back-end/routes/*.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
