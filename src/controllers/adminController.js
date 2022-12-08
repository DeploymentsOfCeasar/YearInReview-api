const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const config = require('../utils/config');

// POST: /api/admin/
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(401).json('Wrong username');

        const decryptPassword = CryptoJs.AES.decrypt(
            admin.password,
            config.PASSWORD_SECRET_KEY
        ).toString(CryptoJs.enc.Utf8);

        if (password !== decryptPassword) return res.status(401).json('Invalid password');

        const token = jwt.sign(
            {
                id: admin._id,
            },
            config.TOKEN_SECRET_KEY
        );
        admin.password = undefined;

        res.status(200).json({
            token,
            admin,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
