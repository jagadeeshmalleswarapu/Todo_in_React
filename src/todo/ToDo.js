import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logout from '../auth/Logout'

const ToDo = () => {
    const BASE_URL = 'http://127.0.0.1:5000/notes'
    const navigate = useNavigate()
    const [ResData, setResData] = useState([])
    useEffect(() => {
        if (sessionStorage.getItem('jwt')) {
            console.log('Session key is present')
            axios.get(BASE_URL + '/all', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                }
            }).then(res => {
                setResData(res.data.data)
                console.log('ResData', ResData)
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
    const addNotes = (e) => {
        navigate('/addNotes')
    }
    const onUpdateClick = (id) => {
        if(id){
            navigate('/update',{state: {id: id}})
        }
    }
    const onDeleteNotes = (id) => {
        if(id){
            axios.delete(BASE_URL+'/'+id,{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                }
            }).then(res=>{
                console.log(res.data)
                navigate(0)
                navigate('/todo')
            }).catch(err=>{
                console.log(err)
                if (err.response.status === 401) {
                    sessionStorage.clear()
                    navigate('/login')
                }
            })
        }
    }
    return (
        <>
            <div>
                <button onClick={e=> addNotes(e)}>Add notes</button>
                <Logout/>
                <table border='1'>
                    <tr>
                        <th>Notes</th>
                        <th>Created_at</th>
                        <th>Created_by</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    {ResData.map(item => (
                        <tr key={item.notes_id}>
                            <td>{item.notes}</td> 
                            <td><b>{item.created_at}</b></td>
                            <td><b>{item.user}</b></td>
                            <td><button onClick={(e) => onUpdateClick(item.notes_id)}>Update notes</button></td>
                            <td><button onClick={(e) => onDeleteNotes(item.notes_id)}>Delete notes</button></td>
                        </tr>
                    ))}

                </table>
            </div>
        </>
    )
}

export default ToDo
