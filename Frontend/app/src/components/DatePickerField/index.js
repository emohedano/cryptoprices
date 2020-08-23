import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './styles.css';

const DatePickerField = (props) => {
    const { text, onChange, value, ...other } = props;
    const dateValue = value || new Date();

    return (
        <label className="date-picker-field">
            <span>{text}</span>
            <DatePicker selected={dateValue} onChange={onChange} {...other}/>
        </label>
    );
}

DatePickerField.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default DatePickerField;