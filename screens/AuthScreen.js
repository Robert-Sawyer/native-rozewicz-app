import React from 'react'
import {View, Text, StyleSheet} from'react-native'

const AuthScreen = props => {

    return (
        <View>
            <Text>Logowanie / rejestracja</Text>
        </View>
    )
}

export const authOptions = navData => {
    return {
        headerTitle: 'Logowanie / rejestracja'
    }
}

const styles = StyleSheet.create({

})

export default AuthScreen