import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import PlacesListScreen from "../screens/PlacesListScreen";

const PlacesStackNavigator = createStackNavigator()

export const PlacesNavigator = () => {

    return (
        <PlacesStackNavigator.Navigator>
            <PlacesStackNavigator.Screen
                name='PlacesList'
                component={PlacesListScreen}
            />
        </PlacesStackNavigator.Navigator>
    )
}

export default PlacesNavigator