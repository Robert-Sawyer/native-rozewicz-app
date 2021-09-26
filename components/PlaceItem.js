import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native'

const PlaceItem = ({onSelect, imgHeight, image, title, detailsHeight, actionHeight, children}) => {

    let TouchableComp = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback
    }

    return (
        <View style={styles.prodItem}>
            <TouchableComp onPress={onSelect}>
                <View style={styles.insideContainer}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.image} source={{uri: image}}/>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title} numberOfLines={3}>{title}</Text>
                    </View>
                    <View style={{...styles.action, ...{height: actionHeight}}}>
                        {children}
                    </View>
                </View>
            </TouchableComp>
        </View>
    )
}

const styles = StyleSheet.create({
    prodItem: {
        flex: 1,
        alignItems: 'center',
    },
    insideContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        padding: 10,
        alignItems: 'center'
    },
    imgContainer: {
        width: 80,
        height: 80,
        borderRadius: 50,
        overflow: 'hidden'
    },
    details: {
        marginLeft: 10,
        width: '75%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        marginVertical: 3,
        letterSpacing: 1,
        fontFamily: 'roundulliard',
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image:{
        width: '100%',
        height: '100%',
    }
})

export default PlaceItem