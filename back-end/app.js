import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import requestGoogleRouter from './routes/requestGoogle.js';
import ingredientRouter from './routes/ingredient.js';
import orderRouter from './routes/order.js';
import sandwichRouter from './routes/sandwich.js';
/* Routes */
const app = express();

app.use(
  cors({
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
  }),
);

app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/ingredient', ingredientRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/sandwich', sandwichRouter);
app.use('/oauth', oauthRouter);
app.use('/api/v1/requestgoogle', requestGoogleRouter);
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
  apis: ['./routes/*.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
