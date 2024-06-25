import express from 'express';
import bodyParser from 'body-parser';


/* Routes */
const app = express();

app.use(bodyParser.json());

/* Quick check if it's working */
app.get('/', (req, res) => {
  res.status(200).send('Welcome to homepage!');
});




/* Swagger setup */

export default app;
