const { calculateRunAndFailTime } = require('../utils/calculateTime');
const { utcTimeToDateTime } = require('../utils/convertTime');

const {
    State2021,
    State2022,
    YearHighlightsState,
    QuarterHighlightsState,
    MonthHighlightsState,
    DateHighlightsState,
} = require('../models');

let checkState2021, checkState2022;

const checkLength2021 = async () => {
    try {
        const quarter1Of2021Length = await QuarterHighlightsState.find({
            year: '2021',
            quarter: 1,
            type: 'run time',
        });
        const quarter2Of2021Length = await QuarterHighlightsState.find({
            year: '2021',
            quarter: 2,
            type: 'run time',
        });
        const quarter3Of2021Length = await QuarterHighlightsState.find({
            year: '2021',
            quarter: 3,
            type: 'run time',
        });
        const quarter4Of2021Length = await QuarterHighlightsState.find({
            year: '2021',
            quarter: 4,
            type: 'run time',
        });
        const year2021Length = await YearHighlightsState.find({
            year: '2021',
            type: 'run time',
        });
        const total =
            (quarter1Of2021Length[0]?.runTimeInMinute || 0) +
            (quarter2Of2021Length[0]?.runTimeInMinute || 0) +
            (quarter3Of2021Length[0]?.runTimeInMinute || 0) +
            (quarter4Of2021Length[0]?.runTimeInMinute || 0);

        if (total.toFixed(5) === year2021Length[0]?.runTimeInMinute.toFixed(5)) return false;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const checkLength2022 = async () => {
    try {
        const quarter1Of2022Length = await QuarterHighlightsState.find({
            year: '2022',
            quarter: 1,
            type: 'run time',
        });
        const quarter2Of2022Length = await QuarterHighlightsState.find({
            year: '2022',
            quarter: 2,
            type: 'run time',
        });
        const quarter3Of2022Length = await QuarterHighlightsState.find({
            year: '2022',
            quarter: 3,
            type: 'run time',
        });
        const quarter4Of2022Length = await QuarterHighlightsState.find({
            year: '2022',
            quarter: 4,
            type: 'run time',
        });
        const year2022Length = await YearHighlightsState.find({
            year: '2022',
            type: 'run time',
        });
        const total =
            (quarter1Of2022Length[0]?.runTimeInMinute || 0) +
            (quarter2Of2022Length[0]?.runTimeInMinute || 0) +
            (quarter3Of2022Length[0]?.runTimeInMinute || 0) +
            (quarter4Of2022Length[0]?.runTimeInMinute || 0);

        if (total.toFixed(5) === year2022Length[0]?.runTimeInMinute.toFixed(5)) return false;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Check database, if state of '2021/2021 states' are changed => update our database
const checkState = async () => {
    checkState2021 = await checkLength2021();
    checkState2022 = await checkLength2022();
    console.log(checkState2021);
    console.log(checkState2022);
};

// Year Highlights
// 94465 collections
const getTotalTimeIn2021 = async () => {
    try {
        if (checkState2021) {
            await YearHighlightsState.deleteMany({});
            const list = await State2021.find({});

            const totalList = calculateRunAndFailTime(list, 1);

            console.log('Get run time total in 2021: -----DONE-----');
            let newInfo = new YearHighlightsState({
                year: 2021,
                type: 'run time',
                ...totalList.totalRunTimeList,
            });
            await newInfo.save();
            newInfo = new YearHighlightsState({
                year: 2021,
                type: 'fail time',
                ...totalList.totalFailTimeList,
            });
            await newInfo.save();
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// 69804 collections
const getTotalTimeIn2022 = async () => {
    try {
        if (checkState2022) {
            await YearHighlightsState.deleteMany({});
            const list = await State2022.find({});

            const totalList = calculateRunAndFailTime(list);

            console.log('Get run time total in 2022: -----DONE-----');
            let newInfo = new YearHighlightsState({
                year: 2022,
                type: 'run time',
                ...totalList.totalRunTimeList,
            });
            await newInfo.save();
            newInfo = new YearHighlightsState({
                year: 2022,
                type: 'fail time',
                ...totalList.totalFailTimeList,
            });
            await newInfo.save();
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Quarter Highlights States
const getTotalEveryQuarterIn2021 = async () => {
    try {
        if (checkState2021) {
            await QuarterHighlightsState.deleteMany({});
            const quarter1 = await State2021.find({
                'Start time': { $regex: /2021-01|2021-02|2021-03/ },
            });
            const quarter2 = await State2021.find({
                'Start time': { $regex: /2021-04|2021-05|2021-06/ },
            });
            const quarter3 = await State2021.find({
                'Start time': { $regex: /2021-07|2021-08|2021-09/ },
            });
            const quarter4 = await State2021.find({
                'Start time': { $regex: /2021-10|2021-11|2021-12/ },
            });

            const list = [[...quarter1], [...quarter2], [...quarter3], [...quarter4]];

            list.map(async (tempList, index) => {
                if (tempList.length > 0) {
                    let totalList;
                    if (tempList[0]['State'] === 'Idle') {
                        totalList = calculateRunAndFailTime(tempList, 1);
                    } else {
                        totalList = calculateRunAndFailTime(tempList);
                    }

                    console.log(`Get run time total in Quarter ${index + 1}/2021: -----DONE-----`);
                    let newInfo = new QuarterHighlightsState({
                        year: 2021,
                        quarter: index + 1,
                        type: 'run time',
                        ...totalList.totalRunTimeList,
                    });
                    await newInfo.save();
                    newInfo = new QuarterHighlightsState({
                        year: 2021,
                        quarter: index + 1,
                        type: 'fail time',
                        ...totalList.totalFailTimeList,
                    });
                    await newInfo.save();
                }
            });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getTotalEveryQuarterIn2022 = async () => {
    try {
        if (checkState2022) {
            await QuarterHighlightsState.deleteMany({});
            const quarter1 = await State2022.find({
                'Start time': { $regex: /2022-01|2022-02|2022-03/ },
            });
            const quarter2 = await State2022.find({
                'Start time': { $regex: /2022-04|2022-05|2022-06/ },
            });
            const quarter3 = await State2022.find({
                'Start time': { $regex: /2022-07|2022-08|2022-09/ },
            });
            const quarter4 = await State2022.find({
                'Start time': { $regex: /2022-10|2022-11|2022-12/ },
            });

            const list = [[...quarter1], [...quarter2], [...quarter3], [...quarter4]];

            list.map(async (tempList, index) => {
                if (tempList.length > 0) {
                    let totalList;
                    if (tempList[0]['State'] === 'Idle') {
                        totalList = calculateRunAndFailTime(tempList, 1);
                    } else {
                        totalList = calculateRunAndFailTime(tempList);
                    }

                    console.log(`Get run time total in Quarter ${index + 1}/2022: -----DONE-----`);
                    let newInfo = new QuarterHighlightsState({
                        year: 2022,
                        quarter: index + 1,
                        type: 'run time',
                        ...totalList.totalRunTimeList,
                    });
                    await newInfo.save();
                    newInfo = new QuarterHighlightsState({
                        year: 2022,
                        quarter: index + 1,
                        type: 'fail time',
                        ...totalList.totalFailTimeList,
                    });
                    await newInfo.save();
                }
            });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Month states
const getTotalEveryMonthIn2021 = async () => {
    try {
        if (checkState2021) {
            await MonthHighlightsState.deleteMany({});
            const month1 = await State2021.find({
                'Start time': { $regex: /2021-01/ },
            });
            const month2 = await State2021.find({
                'Start time': { $regex: /2021-02/ },
            });
            const month3 = await State2021.find({
                'Start time': { $regex: /2021-03/ },
            });
            const month4 = await State2021.find({
                'Start time': { $regex: /2021-04/ },
            });
            const month5 = await State2021.find({
                'Start time': { $regex: /2021-05/ },
            });
            const month6 = await State2021.find({
                'Start time': { $regex: /2021-06/ },
            });
            const month7 = await State2021.find({
                'Start time': { $regex: /2021-07/ },
            });
            const month8 = await State2021.find({
                'Start time': { $regex: /2021-08/ },
            });
            const month9 = await State2021.find({
                'Start time': { $regex: /2021-09/ },
            });
            const month10 = await State2021.find({
                'Start time': { $regex: /2021-10/ },
            });
            const month11 = await State2021.find({
                'Start time': { $regex: /2021-11/ },
            });
            const month12 = await State2021.find({
                'Start time': { $regex: /2021-12/ },
            });

            const list = [
                [...month1],
                [...month2],
                [...month3],
                [...month4],
                [...month5],
                [...month6],
                [...month7],
                [...month8],
                [...month9],
                [...month10],
                [...month11],
                [...month12],
            ];

            list.map(async (tempList, index) => {
                if (tempList.length > 0) {
                    let totalList;
                    if (tempList[0]['State'] === 'Idle') {
                        totalList = calculateRunAndFailTime(tempList, 1);
                    } else if (tempList[0]['State'] === 'Failure') {
                        totalList = calculateRunAndFailTime(tempList, 2);
                    } else {
                        totalList = calculateRunAndFailTime(tempList);
                    }

                    console.log(
                        `Get run time total in each Month ${index + 1}/2021: -----DONE-----`
                    );

                    let newInfo = new MonthHighlightsState({
                        year: 2021,
                        quarter: Math.ceil((index + 1) / 3),
                        month: index + 1,
                        type: 'run time',
                        ...totalList.totalRunTimeList,
                    });
                    await newInfo.save();
                    newInfo = new MonthHighlightsState({
                        year: 2021,
                        quarter: Math.ceil((index + 1) / 3),
                        month: index + 1,
                        type: 'fail time',
                        ...totalList.totalFailTimeList,
                    });
                    await newInfo.save();
                }
            });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getTotalEveryMonthIn2022 = async () => {
    try {
        if (checkState2022) {
            await MonthHighlightsState.deleteMany({});
            const month1 = await State2022.find({
                'Start time': { $regex: /2022-01/ },
            });
            const month2 = await State2022.find({
                'Start time': { $regex: /2022-02/ },
            });
            const month3 = await State2022.find({
                'Start time': { $regex: /2022-03/ },
            });
            const month4 = await State2022.find({
                'Start time': { $regex: /2022-04/ },
            });
            const month5 = await State2022.find({
                'Start time': { $regex: /2022-05/ },
            });
            const month6 = await State2022.find({
                'Start time': { $regex: /2022-06/ },
            });
            const month7 = await State2022.find({
                'Start time': { $regex: /2022-07/ },
            });
            const month8 = await State2022.find({
                'Start time': { $regex: /2022-08/ },
            });
            const month9 = await State2022.find({
                'Start time': { $regex: /2022-09/ },
            });
            const month10 = await State2022.find({
                'Start time': { $regex: /2022-10/ },
            });
            const month11 = await State2022.find({
                'Start time': { $regex: /2022-11/ },
            });
            const month12 = await State2022.find({
                'Start time': { $regex: /2022-12/ },
            });

            const list = [
                [...month1],
                [...month2],
                [...month3],
                [...month4],
                [...month5],
                [...month6],
                [...month7],
                [...month8],
                [...month9],
                [...month10],
                [...month11],
                [...month12],
            ];

            list.map(async (tempList, index) => {
                if (tempList.length > 0) {
                    let totalList;
                    if (tempList[0]['State'] === 'Idle') {
                        totalList = calculateRunAndFailTime(tempList, 1);
                    } else if (tempList[0]['State'] === 'Failure') {
                        totalList = calculateRunAndFailTime(tempList, 2);
                    } else {
                        totalList = calculateRunAndFailTime(tempList);
                    }

                    console.log(
                        `Get run time total in each Month ${index + 1}/2022: -----DONE-----`
                    );

                    let newInfo = new MonthHighlightsState({
                        year: 2022,
                        quarter: Math.ceil((index + 1) / 3),
                        month: index + 1,
                        type: 'run time',
                        ...totalList.totalRunTimeList,
                    });
                    await newInfo.save();
                    newInfo = new MonthHighlightsState({
                        year: 2022,
                        quarter: Math.ceil((index + 1) / 3),
                        month: index + 1,
                        type: 'fail time',
                        ...totalList.totalFailTimeList,
                    });
                    await newInfo.save();
                }
            });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Date states
const getTotalEveryDayIn2021 = async () => {
    try {
        if (checkState2021) {
        await DateHighlightsState.deleteMany({});

        // STEP 1: find mon,tue,... in the list
        const yearList = await State2021.find({});

        let monList = [],
            tueList = [],
            wedList = [],
            thuList = [],
            friList = [],
            satList = [],
            sunList = [],
            dayCheck;

        const daysList = [monList, tueList, wedList, thuList, friList, satList, sunList];

        yearList.map((x, i) => {
            const convertedTime = utcTimeToDateTime(x['Start time']);
            switch (convertedTime.split(' ')[0]) {
                case 'Mon':
                    monList.push(x);
                    break;
                case 'Tue':
                    tueList.push(x);
                    break;
                case 'Wed':
                    wedList.push(x);
                    break;
                case 'Thu':
                    thuList.push(x);
                    break;
                case 'Fri':
                    friList.push(x);
                    break;
                case 'Sat':
                    satList.push(x);
                    break;
                case 'Sun':
                    sunList.push(x);
                    break;
            }
        });

        // STEP 2: calculate mon,tue,... in the list
        const dateTime = [
            { totalRuntime: 0, totalFailtime: 0 },
            { totalRuntime: 0, totalFailtime: 0 },
            { totalRuntime: 0, totalFailtime: 0 },
            { totalRuntime: 0, totalFailtime: 0 },
            { totalRuntime: 0, totalFailtime: 0 },
            { totalRuntime: 0, totalFailtime: 0 },
            { totalRuntime: 0, totalFailtime: 0 },
        ];

        daysList.forEach((day, index) => {
            if(day.length === 0) return;
            dayCheck = utcTimeToDateTime(day[0]['Start time']).split(' ')[2];
            day.reduce((acc, x, i) => {
                const convertedTime = utcTimeToDateTime(x['Start time']).split(' ')[2];
                if (i !== 0 && convertedTime !== dayCheck) {
                    let totalList;
                    if (acc[0]['State'] === 'Idle') {
                        totalList = calculateRunAndFailTime(acc, 1);
                    } else if (acc[0]['State'] === 'Failure') {
                        totalList = calculateRunAndFailTime(acc, 2);
                    } else {
                        totalList = calculateRunAndFailTime(acc);
                    }
                    dateTime[index].totalRuntime += totalList.totalRunTimeList.runTimeInHour;
                    dateTime[index].totalFailtime += totalList.totalFailTimeList.runTimeInHour;
                    acc = [x];
                    dayCheck = convertedTime;
                    return acc;
                }
                acc = [...acc, x];
                dayCheck = convertedTime;
                return acc;
            }, []);
        });

        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        daysOfWeek.forEach(async (day, index) => {
            let newInfo = new DateHighlightsState({
                year: 2021,
                date: day,
                type: 'run time',
                runTimeInHour: dateTime[index].totalRuntime,
            });
            await newInfo.save();
            newInfo = new DateHighlightsState({
                year: 2021,
                date: day,
                type: 'fail time',
                runTimeInHour: dateTime[index].totalFailtime,
            });
            await newInfo.save();
        });

        console.log(`Get run time total in Days of a week 2021: -----DONE-----`);
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const getTotalEveryDayIn2022 = async () => {
    try {
        if (checkState2022) {
            await DateHighlightsState.deleteMany({});

            // STEP 1: find mon,tue,... in the list
            const yearList = await State2022.find({});

            let monList = [],
                tueList = [],
                wedList = [],
                thuList = [],
                friList = [],
                satList = [],
                sunList = [],
                dayCheck;

            const daysList = [monList, tueList, wedList, thuList, friList, satList, sunList];

            yearList.map((x, i) => {
                const convertedTime = utcTimeToDateTime(x['Start time']);
                switch (convertedTime.split(' ')[0]) {
                    case 'Mon':
                        monList.push(x);
                        break;
                    case 'Tue':
                        tueList.push(x);
                        break;
                    case 'Wed':
                        wedList.push(x);
                        break;
                    case 'Thu':
                        thuList.push(x);
                        break;
                    case 'Fri':
                        friList.push(x);
                        break;
                    case 'Sat':
                        satList.push(x);
                        break;
                    case 'Sun':
                        sunList.push(x);
                        break;
                }
            });

            // STEP 2: calculate mon,tue,... in the list
            const dateTime = [
                { totalRuntime: 0, totalFailtime: 0 },
                { totalRuntime: 0, totalFailtime: 0 },
                { totalRuntime: 0, totalFailtime: 0 },
                { totalRuntime: 0, totalFailtime: 0 },
                { totalRuntime: 0, totalFailtime: 0 },
                { totalRuntime: 0, totalFailtime: 0 },
                { totalRuntime: 0, totalFailtime: 0 },
            ];

            daysList.forEach((day, index) => {
                if(day.length === 0) return;
                dayCheck = utcTimeToDateTime(day[0]['Start time']).split(' ')[2];
                day.reduce((acc, x, i) => {
                    const convertedTime = utcTimeToDateTime(x['Start time']).split(' ')[2];
                    if (i !== 0 && convertedTime !== dayCheck) {
                        let totalList;
                        if (acc[0]['State'] === 'Idle') {
                            totalList = calculateRunAndFailTime(acc, 1);
                        } else if (acc[0]['State'] === 'Failure') {
                            totalList = calculateRunAndFailTime(acc, 2);
                        } else {
                            totalList = calculateRunAndFailTime(acc);
                        }
                        dateTime[index].totalRuntime += totalList.totalRunTimeList.runTimeInHour;
                        dateTime[index].totalFailtime += totalList.totalFailTimeList.runTimeInHour;
                        acc = [x];
                        dayCheck = convertedTime;
                        return acc;
                    }
                    acc = [...acc, x];
                    dayCheck = convertedTime;
                    return acc;
                }, []);
            });

            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            daysOfWeek.forEach(async (day, index) => {
                let newInfo = new DateHighlightsState({
                    year: 2022,
                    date: day,
                    type: 'run time',
                    runTimeInHour: dateTime[index].totalRuntime,
                });
                await newInfo.save();
                newInfo = new DateHighlightsState({
                    year: 2022,
                    date: day,
                    type: 'fail time',
                    runTimeInHour: dateTime[index].totalFailtime,
                });
                await newInfo.save();
            });

            console.log(`Get run time total in Days of a week 2022: -----DONE-----`);
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

exports.executeState = async () => {
    checkState();
    getTotalTimeIn2021();
    getTotalTimeIn2022();
    getTotalEveryQuarterIn2021();
    getTotalEveryQuarterIn2022();
    getTotalEveryMonthIn2021();
    getTotalEveryMonthIn2022();
    getTotalEveryDayIn2021();
    getTotalEveryDayIn2022();
};
