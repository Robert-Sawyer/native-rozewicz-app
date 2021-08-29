import {AsyncStorage} from 'react-native'
import {WEB_API_KEY} from "../../constants/keys"

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT'
export const SET_DID_TRY_AUTOLOGIN = 'SET_DID_TRY_AUTOLOGIN'

export const setDidTryAutologin = () => {
    return {type: SET_DID_TRY_AUTOLOGIN}
}

let timer

export const authenticate = (token, userId, expTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expTime))
        dispatch({type: AUTHENTICATE, token: token, userId: userId})
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Coś poszło nie tak!'
            if (errorId === 'EMAIL_EXISTS') {
                message = 'Istnieje już użytkownik o takim adresie e-mail'
            }
            throw new Error(message)
        }

        const resData = await response.json()

        console.log(resData)
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            })

        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Coś poszło nie tak!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'Nie znaleziono takiego adresu e-mail'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Nieprawidłowe hasło'
            } else if (errorId === 'USER_DISABLED') {
                message = 'Zostałeś zbanowany :('
            }
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData.idToken)
        console.log(resData.localId)
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000))
        //zawojam date w date żeby przekształcić liczbę milisekund z powrotem w datę
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return {type: LOGOUT}
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expDate: expirationDate.toISOString()
    }))
}