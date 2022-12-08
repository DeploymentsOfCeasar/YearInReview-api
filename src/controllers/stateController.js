const {
    YearHighlightsState,
    QuarterHighlightsState,
    MonthHighlightsState,
    DateHighlightsState,
} = require('../models');

// Year
exports.getAllYear = async (req, res) => {
    try {
        const infoOfYears = await YearHighlightsState.find({}).sort({ year: 1 });
        res.status(200).json(infoOfYears);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getOneYear = async (req, res) => {
    const year = req.params.year;
    try {
        const infoOfYear = await YearHighlightsState.find({ year });
        res.status(200).json(infoOfYear);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// Quarter
exports.getAllQuarter = async (req, res) => {
    try {
        const infoOfQuarters = await QuarterHighlightsState.find({}).sort({ year: 1, quarter: 1 });
        res.status(200).json(infoOfQuarters);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getAllQuarterOfAYear = async (req, res) => {
    const { year } = req.params;
    try {
        const infoOfQuarter202x = await QuarterHighlightsState.find({ year }).sort({ quarter: 1 });
        res.status(200).json(infoOfQuarter202x);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getOneQuarter = async (req, res) => {
    const { year, quarter } = req.params;
    try {
        const infoOfQuarter = await QuarterHighlightsState.find({ year, quarter });
        res.status(200).json(infoOfQuarter);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// Month
exports.getAMonthOfAQuarter = async (req, res) => {
    const { year, quarter, month } = req.params;

    try {
        const monthTime = await MonthHighlightsState.findOne({ year, quarter, month });
        res.status(200).json(monthTime);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getAllMonthOfAQuarter = async (req, res) => {
    const { year, quarter } = req.params;
    try {
        const monthTimeList = await MonthHighlightsState.find({ year, quarter });
        res.status(200).json(monthTimeList);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getAllMonthOfAYear = async (req, res) => {
    const { year } = req.params;
    try {
        const monthTimeList = await MonthHighlightsState.find({ year }).sort({
            quarter: 1,
            month: 1,
        });
        res.status(200).json(monthTimeList);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// Week
exports.getAWeekdayOfAYear = async (req, res) => {
    const { year, date } = req.params;
    try {
        const dayTime = await DateHighlightsState.find({ year, date }).sort({
            year: 1,
            date: 1,
        });
        res.status(200).json(dayTime);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getAllWeekdayOfAYear = async (req, res) => {
    const { year } = req.params;
    try {
        const dayTimeList = await DateHighlightsState.find({ year }).sort({
            year: 1,
            date: 1,
        });
        res.status(200).json(dayTimeList);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// ************************************ //
// Special Highlights
// Year

exports.getAverageOfYear = async (req, res) => {
    const year = req.params.year;
    try {
        const yearInfo = await YearHighlightsState.find({ year, type: 'run time' });
        const totalPerMonthInHour = yearInfo[0].runTimeInHour / 12;
        const totalPerMonthInMinute = yearInfo[0].runTimeInMinute / 12;
        const totalPerDayInHour = yearInfo[0].runTimeInHour / 365;
        const totalPerDayInMinute = yearInfo[0].runTimeInMinute / 365;
        res.status(200).json({
            month: {
                totalPerMonthInHour,
                totalPerMonthInMinute,
            },
            day: {
                totalPerDayInHour,
                totalPerDayInMinute,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// Quarter
exports.getComparisonInQuarters = async (req, res) => {
    try {
        let highestQuarter2021 = {
                time: 0,
                quarter: 1,
            },
            highestQuarter2022 = {
                time: 0,
                quarter: 1,
            };
        let lowestQuarter2021 = {
                time: Number.MAX_VALUE,
                quarter: 1,
            },
            lowestQuarter2022 = {
                time: Number.MAX_VALUE,
                quarter: 1,
            };
        const totalRunTime2021 = await QuarterHighlightsState.find({
            year: '2021',
            type: 'run time',
        });
        const totalRunTime2022 = await QuarterHighlightsState.find({
            year: '2022',
            type: 'run time',
        });
        totalRunTime2021.forEach((x, index) => {
            x.runTimeInHour > highestQuarter2021.time
                ? (highestQuarter2021 = {
                      time: x.runTimeInHour,
                      quarter: x.quarter,
                  })
                : highestQuarter2021;
            x.runTimeInHour < lowestQuarter2021.time
                ? (lowestQuarter2021 = {
                      time: x.runTimeInHour,
                      quarter: x.quarter,
                  })
                : lowestQuarter2021;
        });
        totalRunTime2022.forEach((x, index) => {
            x.runTimeInHour > highestQuarter2022.time
                ? (highestQuarter2022 = {
                      time: x.runTimeInHour,
                      quarter: x.quarter,
                  })
                : highestQuarter2022;
            x.runTimeInHour < lowestQuarter2022.time
                ? (lowestQuarter2022 = {
                      time: x.runTimeInHour,
                      quarter: x.quarter,
                  })
                : lowestQuarter2022;
        });

        res.status(200).json({
            highestQuarter2021,
            highestQuarter2022,
            lowestQuarter2021,
            lowestQuarter2022,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// Week
