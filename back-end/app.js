import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';

/* Routes */
const app = express();

app.use(bodyParser.json());
app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter)


/* Quick check if it's working */
app.get('/', (req, res) => {
  res.status(200).send('Welcome to homepage!');
});




/* Swagger setup */

export default app;
