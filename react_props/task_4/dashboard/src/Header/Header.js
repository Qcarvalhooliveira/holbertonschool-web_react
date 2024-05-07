import React from 'react';
import logo from '../assets/Holberton_Logo.jpg';
import './Header.css';

function Header() {
  return (
      <header className="header">   
      <div className='logoContainer'>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
        School dashboard
        </h1>
        </div>
      </header>
  )
};

export default Header;