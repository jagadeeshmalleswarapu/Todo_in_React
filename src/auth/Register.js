import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        "username": "",
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
            axios.post('https://mynotes-exfb.onrender.com/auth/register', data).then(res => {
                console.log(res.data.email, data.email)
                if (res.data.email === data.email) {
                    navigate('/login')
                }
                else {
                    navigate('/register')
                }
            }).catch(err => {
                console.log(err)
                navigate('/register')
            })
        }
    }
    return (
        <div>
            Username: <input onChange={e => handleChange(e)} value={data.username} type='text' required name='username' placeholder='enter username' /><br></br>
            Email: <input onChange={e => handleChange(e)} value={data.email} type='email' required name='email' placeholder='enter email' /><br></br>
            Password: <input onChange={e => handleChange(e)} value={data.password} type='password' required name='password' placeholder='enter password' /><br></br>
            <button onClick={e => onClicked(e)} name='Register'>Register</button>
            <br></br>
            <p>If you have an account already? Go to Login page</p><button onClick={(e) => { navigate('/login') }}>Login page</button>
        </div>
    )
}

export default Register
