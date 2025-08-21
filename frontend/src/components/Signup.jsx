import React from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup(){
    return(
        <div className='container'>
            <h1>Signup</h1>
                <form>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' autoFocus placeholder='name here!' />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' placeholder='email here!' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' placeholder='password here!' />
                    </div>
                    <button type='submit'>Register</button>
                    <span>Already have an account? <Link className='linkStyle' to="/login">Login</Link> </span>
                </form>
            <ToastContainer/>
        </div>
    );
}

export default Signup;