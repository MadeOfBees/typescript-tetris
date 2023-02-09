const router = require('express').Router();
const scoresRoutes = require('./scores-routes');
const userRoutes = require('./user-routes');

router.use('/scores', scoresRoutes);
router.use('/users', userRoutes);

module.exports = router;
