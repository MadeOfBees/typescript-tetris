const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const nextFolder = "../client/.next";

app.prepare().then(() => {
  const server = express();
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());
  server.use(routes);
  server.use(express.static(path.join(__dirname, nextFolder)));
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

