import React from 'react'
import { View, Text, StyleSheet, ScrollView } from "react-native"
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import Colors from "../constants/colors"
import CommonStyles from '../constants/commonStyles'
import CustomButton from "../components/UI/CustomButton"

const MapScreen = (props) => {

    const placeLocation = props.route.params ? props.route.params.initialLocation : null
    const placeData = props.route.params ? props.route.params.selectedPlace : null

    const placeTooltipTitle =
        placeData.title && placeData.title.length > 40
            ? placeData.title.substring(0, 40) + '...'
            : placeData.title

    const placeTooltipDescription =
        placeData.description && placeData.description.length > 62
            ? placeData.description.substring(0, 62) + '...'
            : placeData.description


    const mapRegion = {
        latitude: placeLocation ? placeLocation.lat : 51.067,
        longitude: placeLocation ? placeLocation.lon : 19.445,
        latitudeDelta: 0.005,
        longitudeDelta: 0.008,
    }

    const markerCoordinates = {
        latitude: placeLocation.lat,
        longitude: placeLocation.lon
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
            <View style={styles.buttonContainer}>
                <CustomButton onSelect={() => {
                    props.navigation.navigate('PlacesList')
                }}>Przejdź do listy</CustomButton>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton onSelect={() => {
                    props.navigation.navigate('AllPlacesMap')
                }}>Zobacz wszystkie na mapie</CustomButton>
            </View>
            </ScrollView>
            <View style={styles.mapViewContainer}>
                <MapView style={styles.map} region={mapRegion}
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
                                        <CustomButton onSelect={() => {
                                            console.log('Miejsce odwiedzone')
                                        }}>Zobacz szczegóły</CustomButton>
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
        marginVertical: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default MapScreen