import React from 'react'
import {Platform, View, Button, SafeAreaView} from 'react-native'
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import {Ionicons} from "@expo/vector-icons";
import PlacesListScreen, {placesListOptions} from "../screens/PlacesListScreen";
import UserScreen, {userAccountOptions} from "../screens/UserScreen";
import Colors from '../constants/colors'

const defaultNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.mainColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.mainColor
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
        </PlacesStackNavigator.Navigator>
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
    return (
        <PlacesDrawerNavigator.Navigator
            drawerContent={
                props => {
                    return (
                        <View style={{flex: 1, paddingTop: 40}}>
                            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                                <DrawerItemList {...props}/>
                                <Button title='Wyloguj' color={Colors.mainColor} onPress={() => {
                                }}/>
                            </SafeAreaView>
                        </View>
                    )
                }
            }
            drawerContentOptions={{activeTintColor: Colors.mainColor}}
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