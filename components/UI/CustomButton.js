import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import Colors from "../../constants/colors"

const CustomButton = (props) => {

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
        justifyContent: "center",
        alignItems: "center"
    },
    customButton: {
        width: '100%',
        backgroundColor: Colors.mainColor,
        marginVertical: 10,
        paddingVertical: 7,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 21,
        color: '#fff',
        fontFamily: 'roundulliard'
    },
})

export default CustomButton