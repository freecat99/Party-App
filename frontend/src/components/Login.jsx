import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleFailure, handleSuccess } from '../utils';

function Login(){

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    });

    const navigate = useNavigate();

    const handleChange=(e)=>{
        const {name, value} = e.target;
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        const {email, password} = loginInfo;
        if(!email || !password){
            return handleFailure("All fields necessary!")
        }

        try{
            const url = "http://localhost:1601/auth/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })

            const result = await response.json();
            const { success, message, jwtToken, email, error } = result;

            if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInAs', email);
                setTimeout(()=>{
                    navigate('/home')
                },2000)
            }
            else if(error){
                const details = error.details[0].message;
                handleFailure(details);
            }else{
                handleFailure(message);
            }
            
        }catch(err){
            handleFailure(err);
        }
    }


    return(
        <div className='container'>
            <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input onChange={handleChange} type='email' name='email' placeholder='email here!' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input onChange={handleChange} type='password' name='password' placeholder='password here!' />
                    </div>
                    <button type='submit'>Login</button>
                    <span>Don't have an account? <Link className='linkStyle' to="/signup">Register</Link> </span>
                </form>
            <ToastContainer/>
        </div>
    );
}

export default Login;