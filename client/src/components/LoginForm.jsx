import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Context } from '../main'

const LoginForm = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {store} = useContext(Context) 

  return (
    <div className='form-login'>
     <input className='in-email' 
     onChange={e => {
      setEmail(e.target.value)
    }}
     value = {email}
     type = "text"
      placeholder='Email'
     />
     <input className='in-password'
     onChange={e => setPassword(e.target.value)}
     value = {password}
     type = "password"
      placeholder='Пароль'
     />
     <div>
     <button className = "btn-login" onClick={()=> store.login(email, password)}> Логин </button>
     <button className = "btn-registration" onClick={()=> store.registration(email, password)}> Регистрация </button>
     </div>
    </div>
  )
  
}

export default observer(LoginForm)