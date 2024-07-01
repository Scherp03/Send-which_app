import express from 'express';
import bodyParser from 'body-parser';

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

export default app;
