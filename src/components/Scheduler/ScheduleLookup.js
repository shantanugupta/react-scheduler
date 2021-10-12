export const freqType =
    [{ key: 1, value: 'One time' }
        , { key: 4, value: 'Daily' }
        , { key: 8, value: 'Weekly' }
        , { key: 16, value: 'Monthly' }
        , { key: 32, value: 'Monthly Relative' }
        , { key: 64, value: 'Yearly' }
        , { key: 128, value: 'Year long' }];

export const freqIntervalWeekly =
    [
        { key: 64, value: 'Sunday', identifier: 7 }
        , { key: 1, value: 'Monday', identifier: 1 }
        , { key: 2, value: 'Tuesday', identifier: 2 }
        , { key: 4, value: 'Wednesday', identifier: 3 }
        , { key: 8, value: 'Thursday', identifier: 4 }
        , { key: 16, value: 'Friday', identifier: 5 }
        , { key: 32, value: 'Saturday', identifier: 6 }
    ];

export const freqRelativeInterval =
    [{ key: 0, value: 'Not applicable', identifier: 0 }
        , { key: 1, value: 'First', identifier: 1 }
        , { key: 2, value: 'Second', identifier: 2 }
        , { key: 4, value: 'Third', identifier: 3 }
        , { key: 8, value: 'Fourth', identifier: 4 }
        , { key: 16, value: 'Last', identifier: 5 }];

export const freqSubdayType =
    [{ key: 1, value: 'At specified time', identifier: 'not applicable' }
        , { key: 2, value: 'Hour(s)', identifier: 'hours' }
        , { key: 4, value: 'Minute(s)', identifier: 'minutes' }
        //, { key: 8, value: 'Second(s)' , identifier:'seconds'}
    ]

export const freqIntervalMonthlyRelative =
    [
        { key: 7, value: 'Sunday' }
        , { key: 1, value: 'Monday' }
        , { key: 2, value: 'Tuesday' }
        , { key: 3, value: 'Wednesday' }
        , { key: 4, value: 'Thursday' }
        , { key: 5, value: 'Friday' }
        , { key: 6, value: 'Saturday' }
        , { key: 8, value: 'Day' }
        , { key: 9, value: 'Weekday' }
        , { key: 10, value: 'Weekend day' }]

export const freqSubdayTypeMinMax = {
    '1': { min: 1, max: 24 },
    '2': { min: 1, max: 24 },
    '4': { min: 1, max: 60 },
    '8': { min: 1, max: 60 },
};

export const momentTimeValue = {
    2: 'hours',
    4: 'minutes',
    8: 'seconds'
};

export const momentWeek = {
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
    'Sunday': 7
};

export const momentfreqRelativeInterval = {
    'First': 1
    , 'Second': 2
    , 'Third': 3
    , 'Fourth': 4
    , 'Last': 5
}
