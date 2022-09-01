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
<div>
  <Routes>
    <Route
      exact path="/"
      element={<Home/>}
    />
    
    {(tokenString === 'null' || tokenString === null) ? <Route 
        path="/login"
        element={<Login/>}
    /> : null}

    {(tokenString === 'null' || tokenString === null) ? <Route
        path='/register'
        element={<Register/>}
    /> : null}
    
    <Route
      path='/activities'
      element={<Activities/>}
    />
    
    <Route
      path='/routines'
      element={<Routines/>}
    />
  </Routes>
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