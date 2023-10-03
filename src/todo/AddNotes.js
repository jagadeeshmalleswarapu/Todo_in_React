import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddNotes = () => {
    const navigate = useNavigate()
    const [Note, setNote] = useState({
        "note":""
    })
    const BASE_URL = 'http://127.0.0.1:5000/notes/'
    useEffect(() => {
        if (sessionStorage.getItem('jwt')) {
            console.log('Session key is present')
        }
        else {
            navigate('/login')
        }
    },[])
    const onUpdateText = e => {
        var obj = {"note": e.target.value}
        setNote(obj)
    }
    const onUpdateClicked = e => {
        console.log(Note.note)
        axios.post(BASE_URL+'add',Note,  {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            }
        }).then(res=>{
            console.log('Added notes', Note)
            navigate('/todo')
        }).catch(err=>{
            console.log(err)
            if (err.response.status === 400 || err.response.status === 404) {
                alert(err.response.data.error)
            }
            if (err.response.status === 401) {
                sessionStorage.clear()
                navigate('/login')
        }})
    }
    return (
        <div>
            <textarea value={Note.note} rows="20" cols="150" onChange={e=> onUpdateText(e)} />
            <button onClick={(e)=> onUpdateClicked(e)}>Add</button>
        </div>
    )
}

export default AddNotes
