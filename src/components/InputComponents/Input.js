import React from 'react';

//UNDER CONSTRUCTION
// We need to make sure that we provide every required prop so we need a PropTypes.
const Input = (props) => {
    const [state, setInputState] = useState({
        ...props
    });
    
    return (
            <div>
                <label
                    className="control-label font-weight-bold" 
                    htmlFor="recurrEvery">
                        RECURS EVERY {state.freq_recurrence_factor} WEEK(S)
                </label>

                <input 
                    id="recurrEvery" 
                    name="freq_recurrence_factor" 
                    className="form-control text-uppercase" 
                    value={state.freq_recurrence_factor}
                    placeholder="WEEK(S)" 
                    type="number" 
                    min="1" 
                    max="100"
                    onChange={e => handleChange(e)} />
            </div>
        );
}