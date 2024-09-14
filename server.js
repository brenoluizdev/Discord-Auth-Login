require('dotenv').config();

const express = require('express');
const axios = require('axios');
const session = require('express-session');
const app = express();
const PORT = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const secretKeySession = uuidv4();

app.use(session({ secret: secretKeySession, resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPES = 'identify';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  const authUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`;
  res.redirect(authUrl);
});

app.get('/auth/discord/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token } = tokenResponse.data;
    req.session.accessToken = access_token;

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.send('Error during authentication');
  }
});

app.get('/auth/discord/user', async (req, res) => {
  if (!req.session.accessToken) return res.status(401).send('Unauthorized');

  try {
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${req.session.accessToken}` }
    });

    const user = userResponse.data;
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data');
  }
});


app.get('/dashboard', async (req, res) => {
  if (!req.session.accessToken) return res.redirect('/login');

  try {
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${req.session.accessToken}` }
    });

    const user = userResponse.data;
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.send('Error fetching user data');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
