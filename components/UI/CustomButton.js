import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

const CustomButton = ({ onSelect, children }) => {

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.customButton} onPress={onSelect}>
                <Text style={styles.buttonText}>{children}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    customButton: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 32,
        marginVertical: 12,
        backgroundColor: '#6c6c6c',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 19,
        fontFamily: 'roundulliard',
    },
})

export default CustomButton