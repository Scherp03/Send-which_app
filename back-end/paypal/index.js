import {} from 'dotenv/config.js';
import express from 'express';
import generateAccessToken, { createOrder } from './services/paypal_ser.js';

/*require('dotenv').config()
const express = require('express')
const paypal=require("./services/paypal_ser")*/

//dotenv.config();

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

app.get('/complete-order', (req, res) => {
  res.send('Complete Order');
});
app.get('/cancel-order', (req, res) => {
  res.redirect('/');
});

process.on('uncaughtException', function (err) {
  console.log('uncaughtException', err);
});
app.listen(3000, () => console.log('Server started on port 3000'));
