import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import './index.css'
import { Context } from './main'
import UserService from './services/userService.js'
function App() {
  
  const [users, setUsers] = useState([])
  const {store} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')){
      store.checkAuth() 
    }} , [])
    
    async function getUsers(){
      try {
        const response = await UserService.fetchUsers()
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    
    if(store.isLoading){
      return <div> Загрузка..</div>
    }

    if(!store.isAuth){
      return (
        <>
      <LoginForm/>
      <button onClick={getUsers} className='btn-users' > Получить пользователей </button>
        </>
    )}
  return (

   <div>
    <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : `Авторизуйтесь для получения данных`}</h1>
    <div>
    <button onClick={() => store.logout()} className='btn-logout'> Выйти </button>
    <button onClick={getUsers} className='btn-users'> Получить пользователей </button>
    </div>
    <div className='users-div'>
      <ul>
    {users ? users.map(user => 
        <li key = {user.email}> {user.email} </li>
        ): null}
        </ul>
   </div>
      </div>
    )
}

export default observer(App)