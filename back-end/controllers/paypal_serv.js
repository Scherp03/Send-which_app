import axios from 'axios';
import dotenv from 'dotenv'
import { name } from 'ejs';

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

generateAccessToken();

export const createOrder = async (req, res) => {
  const accessToken = await generateAccessToken();

  //const price = req.body.totalprice     price of order
  const price = 10.00
  try {
    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
      method: 'post',
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
          return_url: process.env.BASE_URL + '/api/v1/paypal/complete-order', //final url after the payment
          cancel_url: process.env.BASE_URL + '/cancel-order',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
        },
      }),
    });
    //console.log(response.data);
    //console.log(response.data.links.find(link => link.rel === 'approve').href);
    //return response.data.links.find((link) => link.rel === 'approve').href;
    return res.status(200).json({
      success: true,
      url: response.data.links.find((link) => link.rel === 'approve').href
    })
  } catch (error) {
    console.error('Error', error);
  }
};

export const completeOrder = async (req, res) => {
    try{
        const script = `
        <script>
        window.opener.postMessage('payment-completed', '*');
        window.close();
        </script>
    `;
        res.send(script);

    }catch(error){
        res.redirect(303, 'http://localhost:9000/#');
        console.log('Error logging in with OAuth2 user: ', error);
    }
}

export default generateAccessToken;