import React, { useEffect } from 'react'
import { useState } from 'react';
import { handleDefault, handleFailure } from '../utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home(){
    
    const [loggedInUser, setLoggedInUser] = useState('');
    const [party, setParty] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInAs'))
    },[]);
    
    const handleLogout = (e) =>{
        handleDefault("We will miss you!");
        localStorage.removeItem('loggedInAs');
        localStorage.removeItem('token');

        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }
    
    const fetchParty = async()=>{
        try{
            const url = "http://localhost:1601/party";
            const headers = {
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            
            setParty(result);
        }catch(err){
            handleFailure(err);
        }
    }

    useEffect(()=>{
        fetchParty();
    },[])

    return(
        <div className='container'>
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                
                {party.map((item, index)=>(
                    <ul key={index}>
                        <span>{item.partyId} with {item.name}</span>
                    </ul>
                ))}
                
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Home;