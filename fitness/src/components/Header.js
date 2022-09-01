import React, { useEffect } from 'react';
import { logOut, getUserData } from '../api';


const Header = (props) => {
    const {tokenString, userData, setUserData} = props


    useEffect(() => {
        const myData = async () => {
            const response = await getUserData(localStorage.getItem('token'))
            const result = await response.username
            setUserData(result)
        }
        myData()
    }, [])


    return (
        <div id='header'>
            <div id='title'>
                <h1>Fitness Tracker</h1>
            </div>
            <nav id='headerNav'>
                {localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'null' ? <p id='navWelcome'>
                    Welcome, {`${userData}`}
                </p> : null}
                <a href='./' id='homeLink'>
                    HOME
                </a>
                {(tokenString === 'null' || tokenString === null) ? null : <a href='./myroutines' id='messagesLink'>
                    MY ROUTINES
                </a>}
                <a href='./routines' id='profileLink' className='hidden'>
                    ROUTINES
                </a>
                <a href='./activities' id='profileLink' className='hidden'>
                    ACTIVITIES
                </a>
                {(tokenString === 'null' || tokenString === null) ? <a href='./login' id='loginLink'>
                    LOGIN
                </a> : null}
                {(tokenString !== 'null' && tokenString !== null) ? <button id='logOutButton' className='pseudoLink' onClick={(event) => {
                        event.preventDefault()
                        logOut()
                        window.location='./login'
                    }}>
                    LOGOUT
                </button> : null}
            </nav>
        </div>
    )
};

export default Header;