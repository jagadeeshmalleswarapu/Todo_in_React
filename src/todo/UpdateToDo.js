import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateToDo = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [Note, setNote] = useState({
        "note":""
    })
    const BASE_URL = 'http://127.0.0.1:5000/notes/'
    var id = location.state.id
    useEffect(() => {
        if (sessionStorage.getItem('jwt')) {
            console.log('Session key is present')
            axios.get(BASE_URL + id, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                }
            }).then(res => {
                setNote(res.data)
                console.log('Note', Note)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    sessionStorage.clear()
                    navigate('/login')
                }
            })
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
        axios.put(BASE_URL+id,Note,  {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
            }
        }).then(res=>{
            setNote(res.data)
            console.log('Updated notes', Note)
            navigate('/todo')
        }).catch(err=>{
            console.log(err)
                if (err.response.status === 401) {
                    navigate('/login')
        }})
    }
    return (
        <div>
            <textarea value={Note.note} rows="20" cols="150" onChange={e=> onUpdateText(e)} />
            <button onClick={(e)=> onUpdateClicked(e)}>Update</button>
        </div>
    )
}

export default UpdateToDo
