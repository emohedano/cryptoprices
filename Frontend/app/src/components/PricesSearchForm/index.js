import React, { useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'date-fns/parse';
import isEqual from 'date-fns/isEqual';
import isAfter from 'date-fns/isAfter';

import DatePickerField from '../DatePickerField';
import HourPickerField from '../HourPickerField';

import './styles.css';

function validateDates(startDateTime, endDateTime) {

    if (isEqual(startDateTime, endDateTime) || isAfter(startDateTime, endDateTime)){
        return 'Start date is after the end date';
    }

    // TODO: validate range to avoid huge dataset

    return null;
}

const DEFAULT_HOUR = '00:00';
const HOUR_FORMAT = 'HH:mm';

const PricesSearchForm = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startHour, setStartHour] = useState(DEFAULT_HOUR);
    const [endHour, setEndHour] = useState(DEFAULT_HOUR);

    function handleSearch(e) {
        e.preventDefault();

        const startDateTime = parse(startHour, HOUR_FORMAT, startDate);
        const endDateTime = parse(endHour, HOUR_FORMAT, endDate);

        const error = validateDates(startDateTime, endDateTime);
        setErrorMessage(error);
        
        props.onSearch(startDateTime, endDateTime);
    }

    return (
        <form className="prices-search-form" onSubmit={handleSearch}>
          <h3>Bitcoin prices</h3>
          <div>
            <DatePickerField text="From:" value={startDate} onChange={setStartDate} maxDate={new Date()}/>
            <HourPickerField value={startHour} onChange={setStartHour}/>
            <DatePickerField text="To:" value={endDate} onChange={setEndDate} maxDate={new Date()}/>
            <HourPickerField value={endHour} onChange={setEndHour}/>
          </div>
          <div className="validation-message">
              {errorMessage ? `* ${errorMessage}` : null}
          </div>
          <button type="submit">
            Search
          </button>
        </form>
    )
}

PricesSearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired
}

export default PricesSearchForm;
