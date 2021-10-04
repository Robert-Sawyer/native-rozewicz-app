import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

const UserScreenButton = (props) => {

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.customButton} onPress={props.onSelect}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',

    },
    customButton: {
        width: '75%',
        padding: 5,
        marginVertical: 12,
        backgroundColor: '#6c6c6c',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
    },
    placesTitle: {
        color: '#fff',
        fontSize: 19,
        fontFamily: 'roundulliard',
    },
})

export default UserScreenButton