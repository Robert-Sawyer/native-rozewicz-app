import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const SinglePlaceScreen = props => {

    return (
        <View>
            <Text>Pojedyncze miejsce</Text>
        </View>
    )
}

export const singlePlaceOptions = navData => {
    return {
        headerTitle: 'Pojedyncze miejsce' //docelowo {nazwa klikniętego miejsca}
    }
}

const styles = StyleSheet.create({

})

export default SinglePlaceScreen