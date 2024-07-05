import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 3000;

/* Routes */
const app = express();

// Example: import userRouter from './routes/user.js'

app.use(bodyParser.json());

/* Quick check if it's working */
app.get('/', (req, res) => {
  res.send('Hello from Homepage.');
});

/* MongoDB credentials */
const dbUri =
  'mongodb+srv://' +
  process.env.DB_CREDENTIALS +
  '@' +
  process.env.DB_HOST +
  '/' +
  process.env.DB_NAME +
  '?retryWrites=true&w=majority';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

/* Database connection */
mongoose
  .connect(dbUri, clientOptions)
  .then(() => {
    console.log('Connected to mongoDB successfully!');
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));

/* Swagger setup */
