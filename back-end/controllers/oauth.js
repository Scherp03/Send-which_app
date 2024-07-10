import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
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

    const user = oAuth2Client.credentials;
    console.log('credentials', user);
    await CreateAndLoginUser(oAuth2Client.credentials.access_token);
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err);
  }

  res.redirect(303, 'http://localhost:9000/');
};

async function CreateAndLoginUser(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
  );

  //console.log('response',response);
  const data = await response.json();
  console.log('data', data);
}
