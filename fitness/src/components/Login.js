import React, { useState } from 'react';
import { logIn, logInUser } from '../api';
import "./Login.css"

const Login = () => {
    const [userNameString, setUserNameString] = useState('')
    const [passwordString, setPasswordString] = useState('')

    return (
        <div id='logIn'>
            <form 
                onSubmit={async (event) => {
                    try {
                        event.preventDefault()
                        const response = await logInUser(userNameString, passwordString)
                        const token = response.token
                        if (token) {
                            logIn(JSON.stringify(token), userNameString)
                            window.location='./'
                        }
                        else {
                            alert('Username or Password is incorrect')
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }}
                id='logInForm'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <h1 id='logInLabel'>Log In</h1>
                <input 
                    id='logInUserName'
                    type='text'
                    required
                    placeholder='Username*'
                    value={userNameString}
                    onChange={(event) => {setUserNameString(event.target.value)}}/>
                <input 
                    id='logInPassword'
                    type='password'
                    required
                    placeholder='Password*'
                    value={passwordString}
                    onChange={(event) => {setPasswordString(event.target.value)}}/>
                <button id='logInButton'>Log In</button>
                <a id='logInRegister' href='./register' >Don't have an account? Sign Up</a>
                
            </form>
        </div>
    )
}

export default Login;