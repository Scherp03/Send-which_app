import dotenv from "dotenv";
import express from 'express';
import generateAccessToken, { createOrder } from './services/paypal_serv.js';

/*require('dotenv').config()
const express = require('express')
const paypal=require("./services/paypal_ser")*/

dotenv.config();

//generateAccessToken();

const app = express();

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/pay', async (req, res) => {
  try {
    const url = await createOrder();

    res.redirect(url);
  } catch (error) {
    res.send('Error ' + error);
  }
});

app.get('/api/v1/paypal/complete-order', async (req, res) => {
  try {
      const result = await capturePayment(req.query.token);
      res.send('Course purchased successfully');
  } catch (error) {
      console.error('Error completing order:', error);
      res.status(500).send('An error occurred while completing the order.');
  }
});

app.get('/cancel-order', (req, res) => {
  res.redirect('/');
});

process.on('uncaughtException', function (err) {
  console.log('uncaughtException', err);
});
app.listen(3000, () => console.log('Server started on port 3000'));
