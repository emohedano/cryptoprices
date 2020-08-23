import React from 'react';
import logo from './logo.svg';
import './App.css';
import DatePickerField from './components/DatePickerField';

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
            <DatePickerField text="To:"/>
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
