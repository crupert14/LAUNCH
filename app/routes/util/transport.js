require('dotenv').config();

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,     // Client ID
  process.env.CLIENT_SECRET, // Client Secret
  'https://launchgummies.com' // Redirect URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN, // Refresh Token
});

async function sendMail(to, subject, text) {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'no-reply@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'no-reply@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', result);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

module.exports = { sendMail };