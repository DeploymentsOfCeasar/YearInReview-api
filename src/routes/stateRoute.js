const router = require('express').Router();
const { stateController } = require('../controllers');

// Year
router.get('/year/:year', stateController.getOneYear);
router.get('/year', stateController.getAllYear);

// Quarter
router.get('/quarter/:year/:quarter', stateController.getOneQuarter);
router.get('/quarter/:year/', stateController.getAllQuarterOfAYear);
router.get('/quarter', stateController.getAllQuarter);

// Month
router.get('/month/:year/:quarter/:month', stateController.getAMonthOfAQuarter);
router.get('/month/:year/:quarter', stateController.getAllMonthOfAQuarter);
router.get('/month/:year/', stateController.getAllMonthOfAYear);

// Week
router.get('/week/:year/:date', stateController.getAWeekdayOfAYear);
router.get('/week/:year/', stateController.getAllWeekdayOfAYear);

module.exports = router;
