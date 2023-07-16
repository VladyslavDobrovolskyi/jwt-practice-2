import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import AuthService from '../services/authService'
const API_URL = `http://localhost:3000/api`
export default class Store {
  user = {}
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(boolean) {
    this.isAuth = boolean
  }

  setUser(user) {
    this.user = user
  }
  setLoading(bool) {
    this.isLoading = bool
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }
  async registration(email, password) {
    try {
      const response = await AuthService.registration(email, password)
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }
  async logout(email, password) {
    try {
      const response = await AuthService.logout()
      console.log(response)
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({})
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }
  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      })
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.userDto)
    } catch (error) {
      console.log(error.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}
