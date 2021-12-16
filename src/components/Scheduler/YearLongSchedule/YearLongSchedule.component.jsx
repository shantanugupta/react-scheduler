import React, { useState, useEffect } from 'react';
import './YearLongSchedule.style.css';

const YearLongScheduleComponent = (props) => {
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
        <div className="panel-body">{state.name}</div>
    );
}

export default YearLongScheduleComponent;