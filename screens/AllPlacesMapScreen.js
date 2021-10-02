import React from 'react'
import {ScrollView, Platform, StyleSheet, Text, View} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import CustomHeaderButton from "../components/HeaderButton"
import CustomButton from "../components/UI/CustomButton"

const AllPlacesMapScreen = (props) => {

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.buttonContainer}>
                    <CustomButton onSelect={() => {
                        props.navigation.navigate('PlacesList')
                    }}>Przejdź do listy</CustomButton>
                </View>
            </ScrollView>
            <View style={styles.instructionContainer}>
                <Text style={styles.instruction}>Kliknij na wyróżnione miejsce na mapie aby poznać szczegóły.</Text>
            </View>
        </View>
    )
}

export const allPlacesMapOptions = navData => {
    return {
        headerTitle: 'Mapa wszystkich miejsc',
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
    mainContainer: {
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 4,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionContainer: {
        width: '80%',
    },
    instruction: {
        textAlign: 'center',
        fontSize: 17,
    },
})

export default AllPlacesMapScreen