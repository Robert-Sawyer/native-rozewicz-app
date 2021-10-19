import React, {useState} from 'react'
import { View, ScrollView, Image, Text, StyleSheet } from "react-native"
import {useDispatch, useSelector} from "react-redux"
import { places } from "../data/placesData"
import Colors from '../constants/colors'
import CustomButton from "../components/UI/CustomButton"
import * as actions from '../store/actions/places'

const SinglePlaceScreen = props => {

    const placeId = props.route.params.placeId
    const visitedPlaces = useSelector(state => state.places.visitedPlaces)
    const placeName = props.route.params.placeName
    const selectedPlace = places.find(place => place.id === placeId)
    const dispatch = useDispatch()
    const isVisited = visitedPlaces.map(place => place.plId).includes(placeId)
    const objectId = isVisited ? visitedPlaces.find(element => element.plId === placeId).objId : null

    const selectedPlaceLocation = {lat: selectedPlace.latitude, lon: selectedPlace.longitude}

    const handleShowMap = () => {
        props.navigation.navigate('Map', {
            initialLocation: selectedPlaceLocation,
            selectedPlace: selectedPlace
        })
    }

    const setPlaceAsVisited = () => {
        console.log("Miejsce", selectedPlace)

        const visitedPlace = {
            id: placeId,
            placeName: placeName
        }
        dispatch(actions.setPlaceAsVisited(visitedPlace))
    }

    const setPlaceAsUnvisited = (objId) => {
        dispatch(actions.deletePlace(objId))
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
                    <CustomButton onSelect={handleShowMap}>Zobacz na mapie</CustomButton>
                </View>

                {currentPlaceView &&
                <View style={styles.currentPlaceContainer}>
                    <Text style={styles.description}>Widok współczesny:</Text>
                    <Image style={styles.imageCurrent} source={{uri: currentPlaceView}}/>
                </View>
                }

                {!isVisited ? (
                    <View style={styles.buttonContainer}>
                        <CustomButton onSelect={setPlaceAsVisited}>Oznacz miejsce jako odwiedzone</CustomButton>
                    </View>
                ) : (
                    <View style={styles.buttonContainer}>
                        <CustomButton onSelect={setPlaceAsUnvisited.bind(this, objectId)}>Oznacz miejsce jako nieodwiedzone</CustomButton>
                    </View>
                )
                }

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
        marginVertical: 17,
        paddingHorizontal: 15,
    },
    description: {
        fontSize: 21,
        textAlign: 'center',
        lineHeight: 30,
        fontFamily: 'roundulliard',
        marginBottom: 6,
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
        marginBottom: 10,
        borderColor: Colors.mainColor,
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 5,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SinglePlaceScreen