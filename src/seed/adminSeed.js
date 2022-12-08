const CryptoJs = require('crypto-js');
const { Admin } = require('../models');
const config = require('../utils/config');

exports.createAdmin = async () => {
    const username = config.DEFAULT_ADMIN_USERNAME;
    const password = config.DEFAULT_ADMIN_PASSWORD;
    const key = config.PASSWORD_SECRET_KEY;

    try {
        const admin = await Admin.findOne({ username });
        if (admin !== null) {
            return true;
        }

        const newAdmin = new Admin({
            username,
            password: CryptoJs.AES.encrypt(password, key).toString(),
        });

        await newAdmin.save();

        console.log('--------------------------');
        console.log('Admin created with');
        console.log(`Username => ${username}`);
        console.log(`Password => ${password}`);
        console.log('--------------------------');
    } catch (err) {
        console.error(err);
        return false;
    }
};