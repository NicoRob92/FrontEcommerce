import axios from 'axios'
import {api} from '../credentials'

export async function UserLogin(user) {
  const login = await axios.post(`${api}login`, user)
  if(login.data.msg === 'user logged'){
    localStorage.setItem('logged', true)
    return login.data
  }else{
    localStorage.setItem('logged', false)
  }
}
