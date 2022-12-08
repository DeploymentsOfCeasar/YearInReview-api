const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const monthHighlightsSchema = new Schema(
    {
        year: {
            type: String,
        },
        quarter: {
            type: Number,
        },
        month: {
            type: Number,
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

module.exports = mongoose.model('Month_Highlights State', monthHighlightsSchema);
