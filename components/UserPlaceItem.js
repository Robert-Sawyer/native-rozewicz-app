import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    TouchableNativeFeedback
} from 'react-native'

const UserPlaceItem = ({ onSelect, image, title }) => {

    let TouchableComp = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback
    }

    return (
        <View style={styles.mainContainer}>
            <TouchableComp onPress={onSelect}>
                <View style={styles.insideContainer}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.image} source={{uri: image}}/>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title} numberOfLines={2}>{title}</Text>
                    </View>
                </View>
            </TouchableComp>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '70%',
    },
    insideContainer: {
        flexDirection: 'row',
        width: '95%',
        height: '100%',
        padding: 10,
        alignItems: 'center'
    },
    imgContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden'
    },
    details: {
        marginLeft: 10,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        fontSize: 19,
        marginVertical: 3,
        letterSpacing: 1,
        fontFamily: 'roundulliard',
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default UserPlaceItem