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
    return response.data.access_token;
  } catch (error) {
    console.error(
      'Si è verificato un errore durante la chiamata Axios:',
      error,
    );
  }
}

export const capturePayment = async (req, res) => {
  try {
    const accessToken = await generateAccessToken();
    const orderId = req.query.token;
    const baseURL = process.env.PAYPAL_BASE_URL;

    const url = `${baseURL}/v2/checkout/orders/${orderId}/capture`;

    const response = await axios({
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseData = {
      success: true,
      message: 'Payment completed successfully!',
    };
    const script = `
        <script>
          window.opener.postMessage(${JSON.stringify(responseData)}, '*');
          window.close();
        </script>
      `;
    res.send(script);
  } catch (error) {
    console.error('Error during Axios request:', error); // Debugging line
    //throw error;
    res.redirect(303, 'http://localhost:9000/#');
  }
};

export const cancelOrder = async (req, res) => {
  const responseData = {
    success: false,
    message: 'Order has been cancelled!',
  };
  const script = `
        <script>
          window.opener.postMessage(${JSON.stringify(responseData)}, '*');
          window.close();
        </script>
      `;

  res.send(script);
};
