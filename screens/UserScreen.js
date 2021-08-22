import React from 'react'
import {View, Text, Platform} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import Colors from '../constants/colors'
import CustomHeaderButton from "../components/HeaderButton";

const UserScreen = props => {

    return (
        <View>
            <Text>Moje konto</Text>
        </View>
    )
}

export const userAccountOptions = navData => {
    return {
        headerTitle: 'Konto',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>

    }
}

export default UserScreen