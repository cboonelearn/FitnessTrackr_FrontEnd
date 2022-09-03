import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Activities from "./components/Activities";
import Home from "./components/Home";
import Routines from "./components/Routines";
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import MyRoutines from './components/MyRoutines';
import EditRoutine from './components/EditRoutine';
import { getUserData } from './api';

function App() {
// Define the state constants here:
  const [tokenString, setTokenString] = useState(localStorage.getItem('token'))
  const [userName, setUserName] = useState(localStorage.getItem('username'))
  const [userData, setUserData] = useState({})
  const [routines, setRoutines] = useState([])
  const [myRoutines, setMyRoutines] = useState([])

  return (
<div>
  <Header tokenString={tokenString} userData={userData} setUserData={setUserData}/>
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
      element={<Activities tokenString={tokenString}/>}
    />
    
    <Route
      path='/routines'
      element={<Routines routines={routines} setRoutines={setRoutines}/>}
    />

    {(tokenString !== 'null' || tokenString !== null) ? <Route
      path='/myroutines'
      element={<MyRoutines myRoutines={myRoutines} setMyRoutines={setMyRoutines} tokenString={tokenString} userName={userName}/>}
    /> : null}

    <Route
      path='/editroutine/:routineid'
      element={<EditRoutine myRoutines={myRoutines} setMyRoutines={setMyRoutines} tokenString={tokenString} userName={userName}/>}
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