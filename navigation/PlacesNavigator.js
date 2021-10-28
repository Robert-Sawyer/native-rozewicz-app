import React from 'react'
import { Platform, View, Button, SafeAreaView } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer"
import { Ionicons } from "@expo/vector-icons"
import PlacesListScreen, { placesListOptions } from "../screens/PlacesListScreen"
import MapScreen, { mapOptions } from "../screens/MapScreen"
import SinglePlaceScreen, { singlePlaceOptions } from "../screens/SinglePlaceScreen"
import AllPlacesMapScreen, { allPlacesMapOptions } from "../screens/AllPlacesMapScreen"
import AuthScreen, { authOptions } from "../screens/AuthScreen"
import UserScreen, { userAccountOptions } from "../screens/UserScreen"
import Colors from '../constants/colors'
import { useDispatch } from "react-redux"
import * as authActions from '../store/actions/auth'
import StartUpScreen from '../screens/StartUpScreen'

const defaultNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.mainColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.mainColor,
    headerTitleStyle: {
        fontFamily: 'roundulliard',
        fontSize: 26,
        letterSpacing: 1,
    }
}

const PlacesStackNavigator = createStackNavigator()

export const PlacesNavigator = () => {

    return (
        <PlacesStackNavigator.Navigator screenOptions={defaultNavOption}>
            <PlacesStackNavigator.Screen
                name='PlacesList'
                component={PlacesListScreen}
                options={placesListOptions}
            />
            <PlacesStackNavigator.Screen
                name='Map'
                component={MapScreen}
                options={mapOptions}
            />
            <PlacesStackNavigator.Screen
                name='SinglePlace'
                component={SinglePlaceScreen}
                options={singlePlaceOptions}
            />
            <PlacesStackNavigator.Screen
                name='AllPlacesMap'
                component={AllPlacesMapScreen}
                options={allPlacesMapOptions}
            />
        </PlacesStackNavigator.Navigator>
    )
}

const StartStackNavigator = createStackNavigator()

export const StartNavigator = () => {

    return (
        <StartStackNavigator.Navigator screenOptions={defaultNavOption}>
            <StartStackNavigator.Screen
                name='StartUp'
                component={StartUpScreen}
            />
        </StartStackNavigator.Navigator>
    )
}

const UserStackNavigator = createStackNavigator()

export const UserNavigator = () => {

    return (
        <UserStackNavigator.Navigator screenOptions={defaultNavOption}>
            <UserStackNavigator.Screen
                name='UserAccount'
                component={UserScreen}
                options={userAccountOptions}
            />
        </UserStackNavigator.Navigator>
    )
}

const PlacesDrawerNavigator = createDrawerNavigator()

export const MainNavigator = () => {
    const dispatch = useDispatch()
    return (
        <PlacesDrawerNavigator.Navigator
            drawerContent={
                props => {
                    return (
                        <View style={{ flex: 1, paddingTop: 40 }}>
                            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                                <DrawerItemList {...props}/>
                                <Button title='Wyloguj' color={Colors.mainColor} onPress={() => {
                                    dispatch(authActions.logout())
                                }}/>
                            </SafeAreaView>
                        </View>
                    )
                }
            }
            drawerContentOptions={{ activeTintColor: Colors.mainColor }}
        >
            <PlacesDrawerNavigator.Screen name='Places' component={PlacesNavigator} options={{
                title: 'Miejsca',
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        size={23}
                        color={props.color}
                    />
                )
            }}/>
            <PlacesDrawerNavigator.Screen name='User' component={UserNavigator} options={{
                title: 'Moje konto',
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        size={23}
                        color={props.color}
                    />
                )
            }}/>
        </PlacesDrawerNavigator.Navigator>
    )
}

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOption}>
            <AuthStackNavigator.Screen name='Auth' component={AuthScreen} options={authOptions}/>
        </AuthStackNavigator.Navigator>
    )
}