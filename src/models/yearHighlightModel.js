const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const yearHighlightsSchema = new Schema(
    {
        year: {
            type: String,
        },
        type: {
            type: String,
        },
        runTimeInMinute: {
            type: Number,
        },
        runTimeInHour: {
            type: Number,
        },
        runTimeInDay: {
            type: Number,
        },
    },
    schemaOptions
);

module.exports = mongoose.model('Year_Highlights State', yearHighlightsSchema);
