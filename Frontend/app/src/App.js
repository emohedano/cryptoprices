import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatePickerField from './components/DatePickerField';
import HourPickerField from './components/HourPickerField';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <section className="prices-section">
        <form className="prices-search-form">
          <h3>Bitcoin prices</h3>
          <div>
            <DatePickerField text="From:"/>
            <HourPickerField/>
            <DatePickerField text="To:"/>
            <HourPickerField/>
          </div>
          <button>
            Search
          </button>
        </form>
        <div className="chart-placeholder">
          <div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
