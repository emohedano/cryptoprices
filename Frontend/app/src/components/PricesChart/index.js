import React from 'react';
import PropTypes from 'prop-types';

import ReactApexChart from 'react-apexcharts';

const DEFAULT_CHART_OPTIONS = {
    title: {
        text: 'CandleStick Chart',
        align: 'left'
    },
    xaxis: {
        type: 'datetime',
        labels: {
            datetimeUTC: false //Important: turn UTC off since dates should be provided in localtime
        }
    },
    yaxis: {
        tooltip: {
            enabled: true
        }
    }
}

function PricesChart(props) {
    const { data } = props;
    const series = [{
        data: data
    }];

    return (
        <ReactApexChart type="candlestick" series={series} options={DEFAULT_CHART_OPTIONS}/>
    );
}

PricesChart.propTypes = {
    title: PropTypes.string,
    height: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
}

export default PricesChart;