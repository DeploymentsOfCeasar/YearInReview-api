const moment = require('moment');

const convertTime = (workingTime, idleTime) => {
    if (workingTime && idleTime) {
        const workingDate = moment(workingTime).format('YYYY:MM:DD:HH:mm:ss').split(':');
        const idleDate = moment(idleTime).format('YYYY:MM:DD:HH:mm:ss').split(':');
        return { workingDate, idleDate };
    } else {
        console.log('Something went wrong with ./utils/convertTime');
        return null;
    }
};

const utcTimeToDateTime = (utcTime) => {
    if (utcTime) {
        utcTime= utcTime.replace("+00:00", "+02:00");
        var dateTime = new Date(utcTime).toString();
        return dateTime;
    } else {
        console.log('Something went wrong with ./utils/utcTimeToDateTime');
        return null;
    }
};

module.exports = {
    convertTime,
    utcTimeToDateTime,
};
