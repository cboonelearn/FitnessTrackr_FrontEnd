import "./Register.css"

const Register = () => {
    return ( 
        <form className="register-form">
            <label className="label">Username</label>
            <input className="input" type="text" placeholder="Enter Username"></input>
            <label className="label">Password</label>
            <input className="input" type="password"></input>
            <button onClick={(event) => event.preventDefault}>Register</button>
        </form>
     );
}
 
export default Register;