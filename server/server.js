const express = require('express');
const next = require('next');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  app.get('/static/*', (req, res) => {
    handle(req, res);
  });

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  db.once('open', () => {
    app.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
  });
});
