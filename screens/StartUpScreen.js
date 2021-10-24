import React, {useEffect} from 'react'
import {useDispatch} from "react-redux"
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
            //TODO przed wydaniem usunąć to, co jest po Date(expDate) ORAZ getTime w warunku poniżej
            const expirationDate = new Date(expDate).getTime() - 7200000

            if (expirationDate <= new Date().getTime() || !token || !userId) {
                dispatch(authActions.setDidTryAutologin())
                return;
            }

            const expTime = expirationDate.getTime() - new Date().getTime()

            props.navigation.navigate('PlacesList')
            dispatch(authActions.authenticate(token, userId, expTime))
        }

        tryLogin()
    }, [dispatch])

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' color={Colors.mainColor}/>
        </View>
    )
}

export default StartUpScreen