import React from "react"
import { useSelector } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { MainNavigator, AuthNavigator, StartNavigator } from "./PlacesNavigator"

const AppNavigator = () => {

    const isAuth = useSelector(state => !!state.auth.token)
    const didTryAutologin =  useSelector(state => state.auth.didTryAutoLogin)

    return (
        <NavigationContainer>
            {isAuth && <MainNavigator/>}
            {!isAuth && didTryAutologin && <AuthNavigator/>}
            {!isAuth && !didTryAutologin && <StartNavigator/>}
        </NavigationContainer>
    )
}

export default AppNavigator