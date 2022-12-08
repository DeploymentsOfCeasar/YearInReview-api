const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const stateSchema = new Schema({
    Description: {
        type: String,
    },
    "Start time": {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    "Sub state": {
        type: String,
    }
}, schemaOptions);

module.exports = {
   State2021: mongoose.model('2021 State', stateSchema),
   State2022: mongoose.model('2022 State', stateSchema),
}