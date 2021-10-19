import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {View, ActivityIndicator, AsyncStorage} from 'react-native'
import Colors from '../constants/colors'
import * as authActions from '../store/actions/auth'

const StartUpScreen = props => {

    const dispatch = useDispatch()

    useEffect(() => {

        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
                dispatch(authActions.setDidTryAutologin())
                return;
            }
            const transformedData = JSON.parse(userData)
            const {token, userId, expDate} = transformedData
            const expirationDate = new Date(expDate)

            if (expirationDate <= new Date() || !token || !userId) {
                dispatch(authActions.setDidTryAutologin())
                return;
            }

            const expTime = expirationDate.getTime() - new Date().getTime()

            props.navigation.navigate('Shop')
            dispatch(authActions.authenticate(token, userId, expTime))
        }

        tryLogin()
    }, [dispatch])

    return (
        <View>
            <ActivityIndicator size='large' color={Colors.mainColor}/>
        </View>
    )
}

export default StartUpScreen