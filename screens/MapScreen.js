import React from 'react'
import {View, Text, Platform, StyleSheet, Button} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/colors";

const MapScreen = props => {

    return (
        <View>
            <Text>Mapa</Text>
            <View style={styles.buttonContainer}>
                <Button title='Przejdź do listy' color={Colors.mainColor} onPress={() => {
                    props.navigation.navigate('PlacesList')
                }}/>
            </View>
        </View>
    )
}

export const mapOptions = navData => {
    return {
        headerTitle: 'Mapa miejsc',
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

const styles = StyleSheet.create({
    container: {},
    buttonContainer: {
        width: '100%',
        marginVertical: 10,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default MapScreen