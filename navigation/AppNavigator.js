import React from "react";
import {useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {MainNavigator, AuthNavigator} from "./PlacesNavigator";

const AppNavigator = () => {

    const isAuth = useSelector(state => !!state.auth.token)
    // const didTryAutologin = useSelector(state => state.auth.didTryAutologin)

    return (
        <NavigationContainer>
            {isAuth && <MainNavigator/>}
            {!isAuth && <AuthNavigator/>}
        </NavigationContainer>
    )
}

export default AppNavigator