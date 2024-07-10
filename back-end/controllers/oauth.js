import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import UserModel from '../database/schemas/user.js';
import { Roles } from '../../shared/userTypeDefinitions.js';

dotenv.config();

export const oauth = async (req, res, next) => {
  const code = req.query.code;

  try {
    const redirectURL = 'http://127.0.0.1:3000/oauth';
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL,
    );
    // Get the token from the code
    const r = await oAuth2Client.getToken(code);
    const tokens = r.tokens;
    // Make sure to set the credentials on the OAuth2 client.
    await oAuth2Client.setCredentials(tokens);

    // const user = oAuth2Client.credentials;
    // console.log('credentials', user);

    // await CreateAndLoginUser(oAuth2Client.credentials.access_token);
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oAuth2Client.credentials.access_token}`,
    );

    //console.log('response',response);
    const userData = await response.json();
    console.log('data:', userData);

    const user = await UserModel.findOne({ email: userData.email });
    // if the account was already created, then just login
    if (!user) {
      const data = {
        firstName: userData.given_name,
        lastName: userData.family_name,
        username: userData.given_name + userData.family_name,
        email: userData.email,
        password: 'your-new-password',
        userType: Roles.USER,
      };
      const newUser = await UserModel.create(data);
    }
    const url = 'http://localhost:3000/api/v1/auth/login'; // Replace with your API endpoint

    const logUser = await UserModel.findOne({ email: userData.email });
    // Data to be sent in the request body
    const data = {
      username: logUser.username,
      password: logUser.password,
    };

    // Configuration for the fetch request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicates the content
      },
      body: JSON.stringify(data), // Converts data to JSON string
    };

    // Sending the fetch request
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          return response.json(); // Parse the JSON from the response
        }
      })
      .then((responseData) => {
        // Handle responseData based on your requirements
        if (responseData.success) {
          // Login successful, handle the token or other data
          // res.status(200).json({
          //   success: true,
          //   message: responseData.message,
          //   id: responseData.id,
          //   token: responseData.token,
          // });
        } else {
          // Login failed
          throw new Error('Something went wrong while logging the user');
        }
      });
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err);
  }

  res.redirect(303, 'http://localhost:9000/');
};

// async function CreateAndLoginUser(access_token) {

// }
