import React, { useState } from 'react'

const LoginForm = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  return (
    <div>
     <input 
     onChange={e => {
      setEmail(e.target.value,
        console.log(e.target.value)
        )
    }}
     value = {email}
     type = "text"
      placeholder='Email'
     />
     <input 
     onChange={e => setPassword(
      e.target.value,
      console.log(e.target.value)
      )}
     value = {password}
     type = "password"
      placeholder='password'
     />
     <button> Логин </button>
     <button> Регистрация </button>
    </div>
  )
  
}

export default LoginForm