import React from 'react'
import { ScrollView, Platform, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { places } from "../data/placesData"
import Colors from "../constants/colors"
import CommonStyles from '../constants/commonStyles'
import CustomHeaderButton from "../components/HeaderButton"
import CustomButton from "../components/UI/CustomButton"

const AllPlacesMapScreen = (props) => {

    const mapRegion = {
        latitude: 51.0695,
        longitude: 19.4435,
        latitudeDelta: 0.005,
        longitudeDelta: 0.016,
    }

    const renderAllMarkers = (place) =>{
        const coordinates = {
            latitude: place.latitude,
            longitude: place.longitude
        }

        const title = place.title && place.title.length > 40
            ? place.title.substring(0, 40) + '...'
            : place.title

        const description = place.description && place.description.length > 62
            ? place.description.substring(0, 62) + '...'
            : place.description

        return (
            <Marker key={place.id} coordinate={coordinates} title={place.title} image={require('../assets/place.png')}
            >
                <Callout tooltip onPress={() => {
                    props.navigation.navigate('SinglePlace', {
                        placeId: place.id,
                        placeName: place.title
                    })
                }}>
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipTitle}>{title}</Text>
                        <Text style={styles.tooltipDesc}>{description}</Text>
                        <View style={styles.buttonContainer}>
                            <CustomButton onSelect={() => {
                                console.log('Miejsce odwiedzone')
                            }}>Zobacz szczegóły</CustomButton>
                        </View>
                    </View>
                </Callout>
            </Marker>
        )
    }

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
            <View style={styles.mapViewContainer}>
                <MapView style={styles.map} region={mapRegion} provider={PROVIDER_GOOGLE}>
                    {places.map(renderAllMarkers)}
                </MapView>
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
        marginVertical: 0,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionContainer: {
        width: '80%',
    },
    instruction: {
        fontFamily: 'roundulliard',
        textAlign: 'center',
        fontSize: 20,
    },
    mapViewContainer: {
        width: '95%',
        height: 530,
        marginTop: 10,
        borderColor: Colors.mainColor,
        borderWidth: 6,
        borderRadius: 9,
    },
    map: {
        flex: 1,
        borderRadius: 15,
        height: '100%',
        width: '100%',
    },
    tooltip: CommonStyles.tooltip,
    tooltipTitle: CommonStyles.tooltipTitle,
    tooltipDesc: CommonStyles.tooltipDesc,
})

export default AllPlacesMapScreen