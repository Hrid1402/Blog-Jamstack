import {React, useState} from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './styles/Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        fetch("https://blog-api-q7yf.onrender.com/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'user': username,
                'password': password,
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error("Error, wrong username or password");
            }
            return response.json();
        }).then(response=>{
            Cookies.set('token', response.token, { expires: 7 });
            setMessage(response.message);
            navigate("/");
        }).catch(error => {setMessage("Error, wrong username or password")});
    }
    return (
        <>
            <div className='login'>
                <h1>Login</h1>
                {
                    message ? <h2 className='redFont'>{message}</h2> : null
                }
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <label htmlFor="user">Username</label>
                        <input type="text" name="user" id="user" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="inputs">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </>
        
    )
}

export default Login