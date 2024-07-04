import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import cors from 'cors';

/* Routes */
const app = express();

app.use(cors({
  origin: 'http://localhost:9000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Origin'],
  
 }));

app.use(bodyParser.json());
app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter)


/* Quick check if it's working */
app.get('/', (req, res) => {
  res.status(200).send('Welcome to homepage!');
});




/* Swagger setup */

export default app;
