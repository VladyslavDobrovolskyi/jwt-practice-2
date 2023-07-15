import React, { useContext, useState } from 'react'
import { Context } from '../main'

const LoginForm = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {store} = useContext(Context) 
  return (
    <form>
     <input 
     onChange={e => {
      setEmail(e.target.value,
        console.log(e.target.value)
        )
    }}
     value = {email}
     type = "text"
      placeholder='Email'
      autoComplete="current-email"
     />
     <input 
     onChange={e => setPassword(
      e.target.value,
      console.log(e.target.value)
      )}
     value = {password}
     type = "password"
      placeholder='Пароль'
      autoComplete="current-password"
     />
     <button onClick={()=> store.login(email, password)}> Логин </button>
     <button onClick={()=> store.registration(email, password)}> Регистрация </button>
    </form>
  )
  
}

export default LoginForm