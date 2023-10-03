import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const naviagte = useNavigate()
    const onLogout = e => {
        sessionStorage.clear()
        naviagte('/login')
    }
    return (

        <button onClick={e => onLogout(e)}>Logout</button>

    )
}

export default Logout
