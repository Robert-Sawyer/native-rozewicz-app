import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from "react-native";
import MapPreview from "../components/MapPreview";
import {useSelector} from "react-redux"
import Colors from '../constants/colors'

const SinglePlaceScreen = props => {

    const placeId = props.route.params.placeId
    const selectedPlace = useSelector(state => state.places.places.find(place => place.id === placeId))

    const selectedPlaceLocation = {lat: selectedPlace.latitude, lon: selectedPlace.longitude}
    const handleShowMap = () => {
        props.navigation.navigate('Map', { readOnly: true, initialLocation: selectedPlaceLocation})
    }

    const coordinates = {
        lat: selectedPlace.latitude,
        lon: selectedPlace.longitude
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image style={styles.image} source={{uri: selectedPlace.image}}/>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{selectedPlace.description}</Text>
            </View>
            <View style={styles.locationContainer}>
                <MapPreview coords={coordinates} style={styles.mapPreview} location={selectedPlaceLocation} onPress={handleShowMap}/>
            </View>

        </ScrollView>
    )
}

export const singlePlaceOptions = navData => {
    return {
        headerTitle: navData.route.params ? navData.route.params.placeName : null,
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '30%',
        minHeight: 270,
        backgroundColor: "#ccc"
    },
    descriptionContainer: {
        marginVertical: 10,
        paddingHorizontal: 12,
    },
    description: {
        fontSize: 17,
        textAlign: 'center',
        lineHeight: 22
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    addressContainer: {
        padding: 20,
    },
    // address: {
    //     textAlign: 'center',
    //     color: Colors.mainColor
    // },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 250,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
})

export default SinglePlaceScreen