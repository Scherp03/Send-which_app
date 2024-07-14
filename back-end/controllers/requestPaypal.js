import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

async function generateAccessToken() {
  try {
    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
      method: 'POST',
      data: 'grant_type=client_credentials',
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
    });
    //console.log(response.data);
    return response.data.access_token;
  } catch (error) {
    console.error(
      'Si è verificato un errore durante la chiamata Axios:',
      error,
    );
  }
}

export const createOrder = async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  try {
    const accessToken = await generateAccessToken();

    //const price = req.body.totalprice
    const price = 10.0;
    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      data: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            items: [
              {
                name: 'Sandwich ',
                description: 'test',
                quantity: 1,
                unit_amount: {
                  currency_code: 'EUR',
                  value: price,
                },
              },
            ],
            amount: {
              currency_code: 'EUR',
              value: price,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: price,
                },
              },
            },
          },
        ],

        application_context: {
          return_url: process.env.BASE_URL + '/payment', //final url after the payment
          cancel_url: process.env.BASE_URL + '/payment/cancel-order',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
        },
      }),
    });
    
    return res.status(200).json({
      success: true,
      url: response.data.links.find((link) => link.rel === 'approve').href,
    });
  } catch (error) {
    console.error(
      'Si è verificato un errore durante la chiamata Axios:',
      error,
    );
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
};


