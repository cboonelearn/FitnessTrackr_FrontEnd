<<<<<<< HEAD
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Activities from "./components/Activities";
import Home from "./components/Home";
import Routines from "./components/Routines";
import Login from './components/Login';
import Register from './components/Register';
=======

//This is a comment
>>>>>>> f3e8013f9487e11cf6bba50d7474aab8c8f458bc

import Activites from "./components/Activities";
// import Home from "./components/Home";

function App() {
// Define the state constants here:
  const [tokenString, setTokenString] = useState(localStorage.getItem('token'))

  return (
<div>
<<<<<<< HEAD
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
=======
  {/* <Home /> */}
  <Activites />
>>>>>>> f3e8013f9487e11cf6bba50d7474aab8c8f458bc
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