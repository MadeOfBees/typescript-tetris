const express = require('express');
const next = require('next');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const app = express();
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

nextApp.prepare().then(() => {
  app.use(routes);

  if (!dev) {
    app.use(express.static(path.join(__dirname, '../client/.next')));
  }

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  db.once('open', () => {
    app.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
  });
});

