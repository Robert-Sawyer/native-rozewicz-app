import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator} from "@react-navigation/stack";
import PlacesListScreen, {placesListOptions} from "../screens/PlacesListScreen";
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

export default PlacesNavigator