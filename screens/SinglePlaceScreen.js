import React from 'react'
import {View, ScrollView, Image, Text, Button, StyleSheet} from "react-native";
import {useSelector} from "react-redux"
import Colors from '../constants/colors'

const SinglePlaceScreen = props => {

    const placeId = props.route.params.placeId
    const selectedPlace = useSelector(state => state.places.places.find(place => place.id === placeId))

    const selectedPlaceLocation = {lat: selectedPlace.latitude, lon: selectedPlace.longitude}
    const handleShowMap = () => {
        props.navigation.navigate('Map', {
            readOnly: true,
            initialLocation: selectedPlaceLocation,
            selectedPlace: selectedPlace
        })
    }

    const currentPlaceView = selectedPlace.currentView

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Image style={styles.image} source={{uri: selectedPlace.image}}/>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{selectedPlace.title}</Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{selectedPlace.description}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title='Zobacz na mapie' color={Colors.mainColor} onPress={handleShowMap}/>
                </View>

                {currentPlaceView &&
                <View style={styles.currentPlaceContainer}>
                    <Text style={styles.description}>Widok współczesny:</Text>
                    <Image style={styles.imageCurrent} source={{uri: currentPlaceView}}/>
                </View>
                }

                <View style={styles.buttonContainer}>
                    <Button title='Oznacz miejsce jako odwiedzone' color={Colors.mainColor} onPress={() => {
                        console.log('Miejsce odwiedzone')
                    }}/>
                </View>

            </ScrollView>
        </View>
    )
}

export const singlePlaceOptions = navData => {
    return {
        headerTitle: navData.route.params ? navData.route.params.placeName : null,
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollViewContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    image: {
        width: '100%',
        height: 350,
        backgroundColor: "#ccc"
    },
    titleContainer: {
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        fontFamily: 'roundulliard',
        color: Colors.mainColor,
    },
    descriptionContainer: {
        marginVertical: 20,
        paddingHorizontal: 15,
    },
    description: {
        fontSize: 21,
        textAlign: 'center',
        lineHeight: 30,
        fontFamily: 'roundulliard',
        marginBottom: 8,
    },
    currentPlaceContainer: {
        width: '90%',
        alignItems: 'center'
    },
    imageCurrent: {
        width: '100%',
        height: 280,
        borderWidth: 9,
        borderRadius: 25,
        borderColor: Colors.mainColor,
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
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    addressContainer: {
        padding: 20,
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 250,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SinglePlaceScreen