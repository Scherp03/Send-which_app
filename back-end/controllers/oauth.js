import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import UserModel from '../database/schemas/user.js';
import UserTypeModel from '../database/schemas/userType.js';
import { Roles } from '../../shared/userTypeDefinitions.js';

dotenv.config();

export const oauth = async (req, res, next) => {
  const code = req.query.code;

  try {
    const redirectURL = `${process.env.BASE_URL}/oauth`;
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

    const oauthToken = oAuth2Client.credentials.access_token;

    // const response = await fetch(
    //   `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oauthToken}`,
    // );
    // const userData = await response.json();

    const response = await axios.post(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oauthToken}`,
    );

    const userData = response.data;

    const user = await UserModel.findOne({ email: userData.email });
    // if the account was already created, then just login
    if (!user) {
      // create crypted password
      const hashedPassword = await bcrypt.hash('temporary-password', 10);
      const data = {
        firstName: userData.given_name,
        lastName: userData.family_name,
        username: userData.given_name + userData.family_name,
        email: userData.email,
        password: hashedPassword,
        userType: Roles.USER,
      };
      await UserModel.create(data);
    }
    // user to login
    const loginUser = await UserModel.findOne({ email: userData.email });

    // generate JWT token
    const userType = await UserTypeModel.findOne({ role: loginUser.userType });
    const payload = {
      username: req.body.username,
      role: userType.role,
      permissions: userType.permissions,
    };
    const options = { expiresIn: '8h' };
    const access_key = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      options,
    );
    const responseData = {
      success: true,
      message: `Welcome ${loginUser.username}! Your current password is: <temporary-password>. Change it ASAP`,
      id: loginUser._id,
      token: access_key,
    };

    const script = `
    <script>
      window.opener.postMessage(${JSON.stringify(responseData)}, '*');
      window.close();
    </script>
  `;
    res.send(script);
  } catch (err) {
    res.redirect(303, 'http://localhost:9000/#');
    console.log('Error logging in with OAuth2 user: ', err);
  }
};
