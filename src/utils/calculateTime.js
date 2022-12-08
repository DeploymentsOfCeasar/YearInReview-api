const { convertTime, convertTimeInLocalDate } = require('./convertTime');

const calculateTime = (date) => {
    if (date) {
        const { workingDate, idleDate } = date;
        const longMonths = ['01', '03', '05', '07', '08', '10', '12'];
        const shortMonths = ['04', '06', '09', '11'];
        let day, hour, minute, second;

        if (Number(idleDate[1]) > Number(workingDate[1]) && longMonths.includes(workingDate[1])) {
            day = Number(idleDate[2]) + 31 - Number(workingDate[2]);
        } else if (Number(idleDate[1]) > Number(workingDate[1]) && workingDate[1] == '2') {
            day = Number(idleDate[2]) + 28 - Number(workingDate[2]);
        } else if (
            Number(idleDate[1]) > Number(workingDate[1]) &&
            shortMonths.includes(workingDate[1])
        ) {
            day = Number(idleDate[2]) + 30 - Number(workingDate[2]);
        } else {
            day = Number(idleDate[2]) - Number(workingDate[2]);
        }

        hour = Number(idleDate[3]) - Number(workingDate[3]);
        minute = Number(idleDate[4]) - Number(workingDate[4]);
        second = Number(idleDate[5]) - Number(workingDate[5]);

        const runTimeInHour = day * 24 + hour + minute / 60 + second / 3600;
        const runTimeInMinute = day * 1440 + hour * 60 + minute + second / 60;
        const runTimeInDay = day + hour / 24 + minute / 1440;
        return {
            runTimeInMinute,
            runTimeInHour,
            runTimeInDay,
        };
    } else {
        return null;
    }
};

const calculateRunAndFailTime = (list, startIndex = 0) => {
    if (list.length > 0) {
        const totalRunTimeList = {
            runTimeInMinute: 0,
            runTimeInHour: 0,
            runTimeInDay: 0,
        };
        const totalFailTimeList = {
            runTimeInMinute: 0,
            runTimeInHour: 0,
            runTimeInDay: 0,
        };
        const working = 'Working';
        const failure = 'Failure';
        const idle = 'Idle';

        for (let i = startIndex; i < list.length; i += 2) {
            if (list[i]['State'] === working) {
                if (i + 1 >= list.length) break; // Case: state working is in the end of the list
                if (list[i + 1]['State'] === idle) {
                    const date = convertTime(list[i]['Start time'], list[i + 1]['Start time']);
                    const totalItem = calculateTime(date);
                    totalRunTimeList.runTimeInMinute += totalItem.runTimeInMinute;
                    totalRunTimeList.runTimeInHour += totalItem.runTimeInHour;
                    totalRunTimeList.runTimeInDay += totalItem.runTimeInDay;
                    continue;
                } else if (list[i + 1]['State'] === failure) {
                    // calculate run time
                    let date = convertTime(list[i]['Start time'], list[i + 1]['Start time']);
                    let totalItem = calculateTime(date);
                    totalRunTimeList.runTimeInMinute += totalItem.runTimeInMinute;
                    totalRunTimeList.runTimeInHour += totalItem.runTimeInHour;
                    totalRunTimeList.runTimeInDay += totalItem.runTimeInDay;

                    // calculate fail time
                    if (i + 2 >= list.length) break; // Case: state failure is in the end of the list
                    date = convertTime(list[i + 1]['Start time'], list[i + 2]['Start time']);
                    totalItem = calculateTime(date);
                    totalFailTimeList.runTimeInMinute += totalItem.runTimeInMinute;
                    totalFailTimeList.runTimeInHour += totalItem.runTimeInHour;
                    totalFailTimeList.runTimeInDay += totalItem.runTimeInDay;
                    i += 1;
                    continue;
                }
            } else if (list[i]['State'] === idle) {
                i -= 1;
                continue;
            } else {
                continue;
            }
        }
        return { totalRunTimeList, totalFailTimeList };
    } else {
        return null;
    }
};

module.exports = {
    calculateTime,
    calculateRunAndFailTime,
    // calculateTotalFailTime,
    // calculateTotalRunTimeInLocalDate,
};
