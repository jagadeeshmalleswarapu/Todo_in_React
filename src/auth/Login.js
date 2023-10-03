import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        "email": "",
        "password": ""
    })
    useEffect(() => {
        if (sessionStorage.getItem('jwt')) {
            navigate('/todo')
        }
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onClicked = e => {
        console.log(data)
        if (!data.email && !data.password) {
            alert('Email & Password should not be empty!!!')
        }
        else {
            axios.post('http://127.0.0.1:5000/auth/login', data).then(res => {
                console.log(res.data.email, data.email)
                console.log(res.data)
                if (res.data.access !== '' && res.data.email === data.email) {
                    sessionStorage.setItem('jwt', res.data.access)
                    navigate('/todo')
                }
                else {
                    navigate('/login')
                    alert("Invalid credientials")
                }
            }).catch(err => {
                console.log(err)
                console.log(err.response.status)
                navigate('/login')
                alert("Invalid credientials")
            })
        }
    }
    return (
        <>
            Email: <input onChange={e => handleChange(e)} value={data.email} type='email' required name='email' placeholder='enter email' /><br></br>
            Password: <input onChange={e => handleChange(e)} value={data.password} type='password' required name='password' placeholder='enter password' /><br></br>
            <button onClick={e => onClicked(e)} name='Login'>Login</button>
            <br></br>
            <p>If you have don't an account, Go to Registration page</p><button onClick={(e) => { navigate('/register') }}>Register page</button>


        </>
    )
}

export default Login
