import React, { useState, useEffect } from 'react';
import './YearlySchedule.style.css';

const YearlyScheduleComponent = (props) => {
    const [state, setState] = useState({
        ...props.schedule
    })

    // const handleChange = (e) => {
    //     let name = e.target.attributes["property_name"].value;
    //     let value = e.target.value;
    //     let tempState = {
    //         ...state,
    //         [name]: value
    //     };

    //     setState(tempState);
    //     onComponentChange(tempState);
    // }

    useEffect(() => {
        let newState = props.schedule;
        setState(newState);
    }, [props.schedule])

    return (

        <div className="panel-body">Yearly Schedule
            <div>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>
        </div>
    );
}

export default YearlyScheduleComponent;