import React from "react"
import { FlatList, View, SafeAreaView, Platform, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { places } from "../data/placesData"
import PlaceItem from "../components/PlaceItem"
import CustomHeaderButton from "../components/HeaderButton"
import CustomButton from "../components/UI/CustomButton"

const PlacesListScreen = (props) => {

    const renderPlaceItem = placeData => {
        return (
            <PlaceItem
                title={placeData.item.title}
                image={placeData.item.image}
                imgHeight={'50%'}
                detailsHeight={'25%'}
                actionHeight={2}
                onSelect={() => {
                    props.navigation.navigate('SinglePlace', {
                        placeId: placeData.item.id,
                        placeName: placeData.item.title
                    })
                }}
            />
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={styles.buttonContainer}>
                    <CustomButton onSelect={() => {
                        props.navigation.navigate('AllPlacesMap')
                    }}>Przełącz na mapę</CustomButton>
                </View>
                <View style={styles.placesContainer}>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 220 }}
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
        height: 70,
        paddingTop: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placesContainer: {
        flexDirection: 'column',
    }
})

export default PlacesListScreen