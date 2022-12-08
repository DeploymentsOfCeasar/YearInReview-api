const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const adminSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, schemaOptions);

module.exports = mongoose.model('Admin', adminSchema);