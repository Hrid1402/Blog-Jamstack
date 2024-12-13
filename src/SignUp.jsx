import {React, useState} from 'react'
import { useNavigate } from "react-router-dom";
import './styles/SignUp.css'

function SignUp() {
    const [username, setUsername] = useState('');
    const [confirmPassword ,setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        fetch("https://blog-api-q7yf.onrender.com/sign-up", {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'user': username,
                'password': password,
                'confirmPassword': confirmPassword
            })
        }).then(response => response.json()).then(response=>{
            if (response.id == undefined) {
                throw (response);
            }
            navigate("/");
        }).catch(error => {
            let text = ""
            for(e of error){
                text += "-> " + (e.msg + "\n")
            }
            setMessage(text);
        });
    }
    return (
        <>
            <div className='login'>
                <h1>Sign-up</h1>
                {
                    message ? <pre className='messageError'>{message}</pre> : null
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
                    <div className="inputs">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="on" />
                    </div>
                    <button>Sign up</button>
                </form>
            </div>
        </>
        
    )
}

export default SignUp