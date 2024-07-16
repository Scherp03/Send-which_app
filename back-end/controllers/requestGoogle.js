import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

export const request = async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${process.env.CLIENT_BASE_URL}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  const redirectURL = `${process.env.BASE_URL}/oauth`;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL,
  );

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ];

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });

  return res.status(200).json({
    success: true,
    url: authorizeUrl,
  });
};
