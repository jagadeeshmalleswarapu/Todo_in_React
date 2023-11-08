import axios from 'axios'

const API = 'https://mynotes-exfb.onrender.com/notes/all'
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NjE1NTg1NCwianRpIjoiMmI2OGJiNmItNzk3YS00MDU1LTgyODktZWJkNDAxYjIyZmIwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjk2MTU1ODU0LCJleHAiOjE2OTYxNTY3NTR9.RnLX9slpdnnJYwpKIg-Hsbtb1IuWtlFERHc4De7tvwM'

class NotesComponent{
    callTheApi(){
        return axios.get(API, {
            headers:{
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        })
    }
}

export default new NotesComponent()