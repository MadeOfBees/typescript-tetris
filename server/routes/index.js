const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');
const next = require('next');

router.use('/api', apiRoutes);

module.exports = router;
