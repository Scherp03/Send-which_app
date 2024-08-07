import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import requestPaypalRouter from './routes/requestPaypal.js';
import paymentRouter from './routes/payment.js';
import oauthRouter from './routes/oauth.js';
import orderRouter from './routes/order.js';
import requestGoogleRouter from './routes/requestGoogle.js';
import ingredientRouter from './routes/ingredient.js';
import sandwichRouter from './routes/sandwich.js';
import slotsRouter from './routes/slot.js';
/* Routes */
const app = express();

app.use(
  cors({
    origin: [
      `${process.env.CLIENT_BASE_URL}`,
      'https://send-which-app.onrender.com',
      `${process.env.BASE_URL}`,
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
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
app.use('/api/v1/order', orderRouter);
app.use('/oauth', oauthRouter);
app.use('/api/v1/requestgoogle', requestGoogleRouter);
app.use('/api/v1/paypal', requestPaypalRouter);
app.use('/payment', paymentRouter);
app.use('/api/v1/sandwich', sandwichRouter);
app.use('/api/v1/ingredients', ingredientRouter);
app.use('/api/v1/slots', slotsRouter);
/* Quick check if it's working */
app.get('/', (req, res) => {
  res.status(200).send('The Server is running!');
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
