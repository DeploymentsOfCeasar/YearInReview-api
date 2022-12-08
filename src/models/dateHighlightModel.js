const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const dateHighlightsSchema = new Schema(
    {
        year: {
            type: String,
        },
        date: {
            type: String,
        },
        type: {
            type: String,
        },
        runTimeInHour: {
            type: Number,
        },
    },
    schemaOptions
);

module.exports = mongoose.model('Date_Highlights State', dateHighlightsSchema);
