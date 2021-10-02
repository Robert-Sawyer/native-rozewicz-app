import React, {useState} from 'react'
import {View, Text, StyleSheet, Button} from "react-native"
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from "react-native-maps"
import Colors from "../constants/colors"

const MapScreen = (props) => {

    const placeLocation = props.route.params ? props.route.params.initialLocation : null
    const isReadOnly = props.route.params ? props.route.params.readOnly : null
    const placeData = props.route.params ? props.route.params.selectedPlace : null

    const placeTooltipTitle =
        placeData.title && placeData.title.length > 40
            ? placeData.title.substring(0, 40) + '...'
            : placeData.title

    const placeTooltipDescription =
        placeData.description && placeData.description.length > 62
            ? placeData.description.substring(0, 62) + '...'
            : placeData.description

    const [selectedLocation, setSelectedLocation] = useState(placeLocation)

    const mapRegion = {
        latitude: placeLocation ? placeLocation.lat : 51.067,
        longitude: placeLocation ? placeLocation.lon : 19.445,
        latitudeDelta: 0.005,
        longitudeDelta: 0.015,
    }

    const handleSelectLocation = event => {
        if (isReadOnly) {
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lon: event.nativeEvent.coordinate.longitude
        })
    }

    let markerCoordinates

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lon
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.buttonContainer}>
                <Button title='Przejdź do listy' color={Colors.mainColor} onPress={() => {
                    props.navigation.navigate('PlacesList')
                }}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Zobacz wszystkie na mapie' color={Colors.mainColor} onPress={() => {
                    props.navigation.navigate('AllPlacesMap')
                }}/>
            </View>
            <View style={styles.mapViewContainer}>
                <MapView style={styles.map} region={mapRegion} onPress={handleSelectLocation}
                         provider={PROVIDER_GOOGLE}>
                    {
                        markerCoordinates &&
                        <Marker
                            title={placeData.title}
                            description={placeData.description.substring(0, 20)}
                            coordinate={markerCoordinates}
                            image={require('../assets/place.png')}
                            onPress={() => {
                            }}
                        >
                            <Callout tooltip onPress={() => {
                                props.navigation.navigate('SinglePlace', {
                                    placeId: placeData.id
                                })
                            }}>
                                <View style={styles.tooltip}>
                                    <Text style={styles.tooltipTitle}>{placeTooltipTitle}</Text>
                                    <Text style={styles.tooltipDesc}>{placeTooltipDescription}</Text>
                                    <View style={styles.buttonContainer}>
                                        <Button title='Zobacz szczegóły' color={Colors.mainColor} onPress={() => {
                                            console.log('Miejsce odwiedzone')
                                        }}/>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    }
                </MapView>
            </View>
        </View>
    )
}

export const mapOptions = navData => {
    return {
        headerTitle: navData.route.params ? navData.route.params.selectedPlace.title : null
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
    mapViewContainer: {
        width: '95%',
        height: 550,
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
    tooltip: {
        width: 300,
        minHeight: 130,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: 7,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.mainColor,
        borderWidth: 2.5,
        marginBottom: 5,
    },
    tooltipTitle: {
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 5,
    },
    tooltipDesc: {
        textAlign: 'center'
    },

})

export default MapScreen