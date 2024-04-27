import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils.js';
import logo from '../assets/logo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		<h1>School dashboard</h1>
      </div>
	  <hr></hr>
	  <div className="App-body">
	    <p>Login to access the full dashboard</p>
		<label htmlFor="email">E-mail:</label>
		<input type="text" id="email-input" name="email"></input>
		<label htmlFor="password">Password:</label>
		<input type="text" id="password-input" name="password"></input>
        <button>OK</button>
	  </div>
	  <hr></hr>
	  <div className="App-footer">
	    <p>
		  Copyright {getFullYear()} - {getFooterCopy()}
		</p>
	  </div>
    </div>
  );
}

export default App;