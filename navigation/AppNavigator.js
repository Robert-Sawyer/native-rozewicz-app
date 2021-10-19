import React from "react";
import {useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {MainNavigator, AuthNavigator} from "./PlacesNavigator";
import StartUpScreen from "../screens/StartUpScreen";

const AppNavigator = () => {

    const isAuth = useSelector(state => !!state.auth.token)
    const didTryAutologin =  useSelector(state => state.auth.didTryAutoLogin)

    return (
        <NavigationContainer>
            {/*<MainNavigator/>*/}
            {/*<AuthNavigator/>*/}
            {isAuth && <MainNavigator/>}
            {!isAuth && <AuthNavigator/>}
            {/*{!isAuth && !didTryAutologin && <StartUpScreen/>}*/}
        </NavigationContainer>
    )
}

export default AppNavigator