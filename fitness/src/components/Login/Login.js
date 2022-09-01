import "./Login.css";

const Login = () => {
    return ( 
        <form className="login-form">
            <label className="label">Username</label>
            <input className="input" type="text" placeholder="Username"></input>
            <label className="label">Password</label>
            <input className="input" type="password"></input>
            <button onClick={(event) => event.preventDefault}>Log In</button>
        </form>
     );
}
 
export default Login;