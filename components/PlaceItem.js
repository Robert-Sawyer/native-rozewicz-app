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
                    <View style={{...styles.imgContainer, ...{height: imgHeight}}}>
                        <Image style={styles.image} source={{uri: image}}/>
                    </View>
                    <View style={{...styles.details, ...{height: detailsHeight}}}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
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
        width: '100%',
        height: '100%',
    },
    // imgContainer: {
    //     width: '100%',
    // }
    details: {
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        marginVertical: 3,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})

export default PlaceItem