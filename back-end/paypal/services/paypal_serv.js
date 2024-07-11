import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function generateAccessToken() {
  try {
    const response = await axios({
      //url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
      url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      method: 'POST',
      data: 'grant_type=client_credentials',
      auth: {
        username: 'ARbBJCtR7lQwFwg_Qw1gwpeQeSs8BwOu00LYOPefOSfOSdUuzqA-DJw8mOY64Cs9CKBHoDemGk7-iVAj',
        password: 'EONCLgi8YenHJwfNJTmC4Ldb1l2F54LDwCAGvaxaZlM8ByAy2gE6bNoGz6Y6vL_6kc539YUiaeTopOkN',
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

  //console.log(accessToken);
  //const price = req.body.totalprice
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
          cancel_url: process.env.BASE_URL + '/api/v1/paypal/cancel-order',
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

export const capturePayment = async (orderId) => {
  try {
      const accessToken = await generateAccessToken();

      const baseURL = process.env.PAYPAL_BASE_URL;
      
      const url = `${baseURL}/v2/checkout/orders/${orderId}/capture`;
      

      const response = await axios({
          url: url,
          method: 'post',
          headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${accessToken}`
          }
      });

      return response.data;
  } catch (error) {
      console.error("Error during Axios request:", error);  // Debugging line
      throw error;
  }
};

export default generateAccessToken;

