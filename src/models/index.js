module.exports = {
    Admin: require('./adminModel'),
    State2021: require('./stateModel').State2021,
    State2022: require('./stateModel').State2022,

    Quarter1State2021: require('./stateModel').Quarter1State2021,
    Quarter2State2021: require('./stateModel').Quarter2State2021,
    Quarter3State2021: require('./stateModel').Quarter3State2021,
    Quarter4State2021: require('./stateModel').Quarter4State2021,

    Quarter1State2022: require('./stateModel').Quarter1State2022,
    Quarter2State2022: require('./stateModel').Quarter2State2022,
    Quarter3State2022: require('./stateModel').Quarter3State2022,
    Quarter4State2022: require('./stateModel').Quarter4State2022,

    YearHighlightsState: require('./yearHighlightModel'),
    QuarterHighlightsState: require('./quarterHighlightModel'),
    MonthHighlightsState: require('./monthHighlightModel'),
    DateHighlightsState: require('./dateHighlightModel'),
};
