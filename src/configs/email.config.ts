import { google } from 'googleapis';

const CLIENT_ID =
  '778730279838-rj285fsnm7rrndcb978eed968hpi02ks.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04yP55Up6buxxCgYIARAAGAQSNgF-L9IrSmoo-109EcTyOPkBrcrDw6-BkzCAkosf1Tg0mrXpXWAIrNYV2HBTQ89yS0ouoxY07A';
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const getAccessToken = () => {
  return oauth2Client.getAccessToken().then(({ token }) => token);
};

export default {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'cuongng1912@gmail.com',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: getAccessToken(),
  },
};
