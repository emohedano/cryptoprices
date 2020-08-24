import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const HOURS = (() => {
    var labels= [];
    
    for(let i = 0; i <= 23; i++){
        labels.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }
    
    return labels;
})();

const HourPickerField = (props) => {
    const { text, onChange, value } = props;

    function handleChange(e) {
        onChange(e.target.value);
    }

    return (
        <label className="date-picker-field">
            <span>{text}</span>
            <select onChange={handleChange} value={value}>
                {HOURS.map((hour) => {
                   return <option key={hour} value={hour}>{hour}</option>
                })}
            </select>
        </label>
    );
}

HourPickerField.propTypes = {
    text: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default HourPickerField;