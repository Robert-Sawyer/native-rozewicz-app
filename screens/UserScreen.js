import React from 'react'
import {View, Text, Platform, StyleSheet} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import Colors from '../constants/colors'
import CustomHeaderButton from "../components/HeaderButton";

const UserScreen = props => {

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Moje konto</Text>
            <View style={styles.visitedOrUnvisitedPlacesContainer}>
                <Text style={styles.placesTitle}>Odwiedzone miejsca</Text>
            </View>
            <View style={styles.visitedOrUnvisitedPlacesContainer}>
                <Text style={styles.placesTitle}>Nieodwiedzone miejsca</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',

    },
    title: {
        fontSize: 28,
        marginVertical: 15,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 1,
        color: Colors.mainColor,
        fontFamily: 'roundulliard',

    },
    visitedOrUnvisitedPlacesContainer: {
        width: '75%',
        padding: 5,
        marginVertical: 12,
        backgroundColor: '#6c6c6c',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
    },
    placesTitle: {
        color: '#fff',
        fontSize: 19,
        fontFamily: 'roundulliard',
    },
})

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