const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const { Admin } = require('../models');

const tokenDecode = (req) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        try {
            const tokenDecoded = jwt.verify(bearerToken, config.TOKEN_SECRET_KEY);
            return tokenDecoded;
        } catch (err) {
            console.log(err);
            return false;
        }
    } else {
        return false;
    }
};

exports.verifyAdminToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);

    if(tokenDecoded) { 
        const admin = await Admin.findById(tokenDecoded.id);
        if(!admin) return res.status(403).json('Not allowed'); 
        req.admin = admin;
        next();
    }
    else {
        res.status(401).json('Unauthorized')
    }
}
