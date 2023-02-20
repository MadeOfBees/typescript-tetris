const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.prepare().then(() => {
  const server = express();
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use(cors());
  if (process.env.NODE_ENV === 'production') {
    server.use(express.static(path.join(__dirname, '../client/.next')));
  }
  server.use(routes);
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  db.once('open', () => {
    server.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
});