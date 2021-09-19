import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Platform} from "react-native"
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/colors";
import {Image} from "react-native-web";

const MapScreen = props => {

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

    const handleSavePickedLocation = useCallback(() => {
        if (!selectedLocation) {
            return;
        }
        props.navigation.navigate('NewPlace', {pickedLocation: selectedLocation})

    }, [selectedLocation])

    useEffect(() => {
        props.navigation.setParams({saveLocation: handleSavePickedLocation})
    }, [handleSavePickedLocation])

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
            <View style={styles.instructionContainer}>
                <Text style={styles.instruction}>Kliknij na wyróżnione miejsce na mapie aby poznać szczegóły.</Text>
            </View>
            <MapView style={styles.map} region={mapRegion} onPress={handleSelectLocation} provider={PROVIDER_GOOGLE}>
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
                                {/*<Image source={{uri: placeData.image}}/>*/}
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
    mainContainer: {
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 8,
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
    map: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        height: 550,
        width: '95%',
        position: 'absolute',
        top: 120,
    },
    headerButton: {
        marginHorizontal: 20,
        paddingRight: 5,
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? '#fff' : Colors.mainColor
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
    // arrow: {
    //     width: 0,
    //     height: 0,
    //     borderTopColor: '#fff',
    //     borderTopWidth: 16,
    //     borderLeftColor: 'transparent',
    //     borderLeftWidth: 16,
    //     borderRightColor: 'transparent',
    //     borderRightWidth: 16,
    //     alignSelf: 'center',
    //     marginBottom: 5,
    //
    // },
    // arrowBorder: {
    //     backgroundColor: 'transparent',
    //     borderColor: 'transparent',
    //     borderWidth: 16,
    //     alignSelf: 'center',
    //     borderTopColor: '#007a87',
    //     marginTop: 0
    // },

})

export default MapScreen