import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './main'
function App() {
  
  const {store} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')){
     store.checkAuth() 
    }} , [])
  return (

   <div>
    <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : `Авторизуйтесь для получения данных ${localStorage.getItem('token')}`}</h1>
    <LoginForm/>
   </div>
  )
}

export default observer(App)