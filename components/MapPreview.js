import React from 'react'
import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {WEB_API_KEY} from '../constants/keys'

const MapPreview = props => {

    // const coordinates = props.route ? props.route.params.placeLocationSaved : null
    //
    // console.log(coordinates)

    let imagePreviewUrl
    if (props.coords) {
        console.log("props.coords")

        console.log(props.coords)
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
            props.coords.lat
        },${
            props.coords.lon
        }&zoom=16&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
            props.coords.lat
        },${props.coords.lon}&key=${WEB_API_KEY}`
    }

    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview, ...props.style}}>
            {props.coords ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> : props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
})

export default MapPreview