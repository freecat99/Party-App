import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleFailure, handleSuccess } from '../utils';

function Signup(){

    const [signUpInfo, setSignUpInfo] = useState({
        name:'',
        email:'',
        password:''
    });

    const navigate = useNavigate();

    const handleChange=(e)=>{
        const {name, value} = e.target;
        console.log(name, value);
        const copySignUpInfo = {...signUpInfo};
        copySignUpInfo[name] = value;
        setSignUpInfo(copySignUpInfo);
    }
    console.log(signUpInfo); 

    const handleSignUp = async(e) => {
        e.preventDefault();

        const {name, email, password} = signUpInfo;
        if(!name || !email || !password){
            return handleFailure("all fields necessary!")
        }

        try{
            const url = "http://localhost:1601/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpInfo)
            })
            const result = await response.json();
            const { success, message } = result;

            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            }
            handleFailure(message);
            
        }catch(err){
            handleFailure(err);
        }
    }


    return(
        <div className='container'>
            <h1>Signup</h1>
                <form onSubmit={handleSignUp}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input onChange={handleChange} type='text' name='name' autoFocus placeholder='name here!' />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input onChange={handleChange} type='email' name='email' placeholder='email here!' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input onChange={handleChange} type='password' name='password' placeholder='password here!' />
                    </div>
                    <button type='submit'>Register</button>
                    <span>Already have an account? <Link className='linkStyle' to="/login">Login</Link> </span>
                </form>
            <ToastContainer/>
        </div>
    );
}

export default Signup;