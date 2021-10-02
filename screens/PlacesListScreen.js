import React from "react"
import {FlatList, View, Button, SafeAreaView, Platform, StyleSheet} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {useSelector} from "react-redux"
import PlaceItem from "../components/PlaceItem"
import CustomHeaderButton from "../components/HeaderButton"
import Colors from '../constants/colors'

const PlacesListScreen = (props) => {

    const places = useSelector(state => state.places.places)

    const renderPlaceItem = itemData => {
        return (
            <PlaceItem
                title={itemData.item.title}
                image={itemData.item.image}
                imgHeight={'50%'}
                detailsHeight={'25%'}
                actionHeight={2}
                onSelect={() => {
                    props.navigation.navigate('SinglePlace', {
                        placeId: itemData.item.id,
                        placeName: itemData.item.title
                    })
                }}
            />
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button title='Przełącz na mapę' color={Colors.mainColor} onPress={() => {
                        props.navigation.navigate('AllPlacesMap')
                    }}/>
                </View>
                <View style={styles.placesContainer}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 200 }}
                        data={places}
                        keyExtractor={item => item.id}
                        renderItem={renderPlaceItem}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export const placesListOptions = navData => {
    return {
        headerTitle: 'Wszystkie miejsca',
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
    container: {
        width: '100%'
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 10,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placesContainer: {
        flexDirection: 'column',
    }
})

export default PlacesListScreen