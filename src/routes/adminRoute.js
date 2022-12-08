const router = require('express').Router();
const { adminController } = require('../controllers');
const { verifyAdminToken } = require('../utils/tokenHandler');

router.post('/', adminController.login);
router.post('/check-token', verifyAdminToken, (req, res) => {
    res.status(200).json('Authorized');
});

module.exports = router;
