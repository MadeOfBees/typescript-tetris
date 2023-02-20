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

if (process.env.NODE_ENV === 'production') {
  // use next.js to serve up production assets
  app.use(express.static(path.join(__dirname, '../client/.next')));
  // use next.js to serve up the index.html file if it doesn't recognize the route
  app.get('*', (req, res) => {
    return handle(req, res);
  });
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
});
