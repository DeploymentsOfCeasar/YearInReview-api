const router = require('express').Router();

router.use('/admin', require('./adminRoute'));
router.use('/state', require('./stateRoute'));
router.use('/highlight', require('./highlightRoute'));

module.exports = router;
