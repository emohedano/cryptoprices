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

    return (
        <label className="date-picker-field">
            <span>{text}</span>
            <select onChange={onChange}>
                {HOURS.map((hour) => {
                   return <option value={hour} selected={hour === value}>{hour}</option>
                })}
            </select>
        </label>
    );
}

HourPickerField.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default HourPickerField;