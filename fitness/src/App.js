import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Activities from "./components/Activities";
import Home from "./components/Home";
import Routines from "./components/Routines";
import Login from './components/Login';
import Register from './components/Register';

function App() {
// Define the state constants here:
  const [tokenString, setTokenString] = useState(localStorage.getItem('token'))

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

ReactDom.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root')
)

// export default App;