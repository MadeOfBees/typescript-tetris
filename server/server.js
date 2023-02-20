const express = require('express');
const next = require('next');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

db.once('open', () => {
  nextApp.prepare().then(() => {
    app.use('/_next', express.static(path.join(__dirname, '../client/.next')));
    app.use('/static', express.static(path.join(__dirname, '../client/static')));

    app.use(routes);

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    app.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
  });
});
