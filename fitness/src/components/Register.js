import React, { useState } from 'react';
import { logIn, registerNewUser } from '../api';

const Register = () => {
    const [newUser, setNewUser] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    

    return (
        <div id='register'>
            <form 
                onSubmit={async (event) => {
                        try {
                            event.preventDefault()
                            // Error Handling if statements
                            if (newUser.length < 6) {
                                alert('Username must be at least 6 characters')
                            }
                            if (newPassword.length < 8) {
                                alert('Password must be at least 8 charaters')
                            }
                            if (newPassword !== '') {
                                if (newPassword !== confirmPassword) {
                                    alert('Passwords do not match')
                                 }
                            } else {
                                alert('You must enter a password')
                            }


                            const response = await registerNewUser(newUser, newPassword)
                            if (response.error) {
                                alert('Username already exists')
                            } else {
                                const token = response.token
                                logIn(JSON.stringify(token), newUser)
                                window.location='./'
                            }
                        }
                        catch (error) {
                            console.error(error)
                        }}}
                id='registerForm' 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
            <h1 id='registerLabel'>Register New User</h1>
            <input 
                id='registerUserName'
                type='text'
                required
                minLength={6}
                placeholder='Username*'
                value={newUser}
                onChange={(event) => {setNewUser(event.target.value)}}/>
            <input 
                id='registerPassword'
                type='password'
                required
                minLength={8}
                placeholder='Password*'
                value={newPassword}
                onChange={(event) => {setNewPassword(event.target.value)}}/>
            <input 
                id='registerPasswordConfirm'
                type='password'
                required
                minLength={8}
                placeholder='Confirm Password*'
                value={confirmPassword}
                onChange={(event) => {setConfirmPassword(event.target.value)}}/>
            <button id='registerButton'>REGISTER</button>
            <a id='logInRegister' href='./login'>
                Already have an account? Log In
            </a>
           </form>
        </div>
    )
}

export default Register