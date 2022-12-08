const router = require('express').Router();
const { stateController } = require('../controllers');

// Special Highlights
// 1) Year:
router.get('/year/:year', stateController.getAverageOfYear);

// 2) Quarter:
router.get('/quarter', stateController.getComparisonInQuarters);

// 3) Week:


module.exports = router;
