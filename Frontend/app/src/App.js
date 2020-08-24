import React from 'react';
import logo from './logo.svg';
import './App.css';
import PricesSearchForm from './components/PricesSearchForm';

function App() {

  function handleSearch(startDate, endDate) {
    
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <section className="prices-section">
        <PricesSearchForm onSearch={handleSearch}/>
        <div className="chart-placeholder">
          <div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
