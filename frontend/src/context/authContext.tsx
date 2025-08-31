"use client"
import { fetchServer } from '@/lib/api'
import React, {useContext, createContext, useState, useEffect} from 'react'


export const AuthContext = createContext<any>(null)
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}: {children: React.ReactElement}) => {
  const [isAuth, setIsAuth] = useState(false)
  const login = async (data: any)=>{
    const res = await fetchServer('/auth/login', "POST", {
      "username": data.username,
      "password": data.password
    })
    localStorage.setItem("accessToken", res.accessToken)
    setIsAuth(true)
  }
  const signup = async (data: any)=>{
    const res = await fetchServer('/auth/signup', "POST", {
      "fullname": data.fullname,
      "email": data.email,
      "username": data.username,
      "password": data.password
    })
    localStorage.setItem("accessToken", res.accessToken)
    setIsAuth(true)
  }
  const logout = async ()=>{
    await fetchServer('/auth/logout', "DELETE")
    localStorage.removeItem("accessToken")
    setIsAuth(false)
  }
  useEffect(()=>{
    async function refresh() {
      try{
        const res = await fetchServer('/auth/refresh')
        if(!res.accessToken) return
        localStorage.setItem("accessToken", res.accessToken)
        setIsAuth(true)
      }catch(e){
        localStorage.removeItem("accessToken")
        setIsAuth(false)
      }
    }
    refresh()
  }, [])
  return (
    <AuthContext.Provider value={{login, logout, signup, isAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider