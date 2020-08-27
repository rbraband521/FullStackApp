import React from 'react';
import logo from './logo.svg';
import './App.css';




import axios from 'axios';

async function getUser() {
  try {
    const response = await axios.get('http://localhost:5000/api/courses');
    console.log(response);
  } catch (error) {
    console.error(error);
  } }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
getUser();
export default App;
