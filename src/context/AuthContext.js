import { createContext, useEffect, useState } from "react";
import { fetcherPost } from "./SwrContext";
import { RoutesApi } from "../models/routesApi";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Snackbar from "../components/Snackbar";
import Toast from 'react-native-toast-message'
export const AuthContext = createContext()

const showToast = () => {
    return Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] =  useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingSession, setIsLoadingSession] = useState(false)
    const [splashIsLoadingSession, setSplashIsLoadingSession] = useState(false)
    
    const login = async (email, password) => {
        setIsLoading(true)
        const urlEncode = `grant_type=&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&scope=&client_id=&client_secret=`
        return axios.post(`${RoutesApi.AUTH}/login`, urlEncode, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            }
        }).then(res => {
            setUserInfo(res.data)
            console.log(res.data)
            if(userInfo !== undefined){
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            }
            setIsLoading(false)
        }).catch((error) => {
            setIsLoading(false)
            return error.response.data
        })

       
    }

    const recoverPassword = async (email) => {
        return axios.post(`${RoutesApi.AUTH}/recover-password?email=${email}`, undefined).then(res => res.data).catch(error => error.response.data)
    }

    const confirmCode = async (code, email) => {
        return axios.post(`${RoutesApi.AUTH}/confirm-recover?code=${code}&email=${email}`, undefined).then(res => res.data).catch(error => error.response.data)
    }

    const changePassword = async (apikey, password) => {
        return axios.post(`${RoutesApi.AUTH}/change-password?apikey=${apikey}`, `password=${password}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            }
        }).then(res => res.data).catch(error => error.response.data)
    }

    const logout = () => {
        setIsLoadingSession(true)
        setUserInfo({})
        AsyncStorage.removeItem('userInfo')
        setIsLoadingSession(false)
    }
 
    const isLoggedIn = async () => {
        try {
            setSplashIsLoadingSession(true)
            const userInfoAsync = await AsyncStorage.getItem('userInfo')
            const user = JSON.parse(userInfoAsync)
            if(user){
                setUserInfo(user)
            }
            setSplashIsLoadingSession(false)
        } catch (error) {
            setSplashIsLoadingSession(false)
            console.log(`is logged in error ${error}`)
        }
    } 

    useEffect(() => {
        isLoggedIn()
    }, [])
 
    return (
        <AuthContext.Provider value={{
            login, 
            isLoading, 
            userInfo, 
            logout, 
            isLoadingSession, 
            splashIsLoadingSession, 
            recoverPassword,
            confirmCode,
            changePassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}