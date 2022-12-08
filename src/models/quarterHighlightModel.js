const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaOptions = require('./schemaOptions');

const quarterHighlightsSchema = new Schema(
    {
        year: {
            type: String,
        },
        quarter: {
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

module.exports = mongoose.model('Quarter_Highlights State', quarterHighlightsSchema);
