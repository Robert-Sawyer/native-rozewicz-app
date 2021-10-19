import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, Button, FlatList, Platform, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import {useDispatch, useSelector} from "react-redux"
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {places} from "../data/placesData"
import Colors from '../constants/colors'
import CustomHeaderButton from "../components/HeaderButton"
import UserScreenButton from "../components/UI/UserScreenButton"
import UserPlaceItem from "../components/UserPlaceItem"
import * as actions from '../store/actions/places'

const UserScreen = (props) => {

    const [openVisited, setOpenVisited] = useState(false)
    const [openUnvisited, setOpenUnvisited] = useState(false)
    const visitedPlaces = useSelector(state => state.places.visitedPlaces)
    const dispatch = useDispatch()

    const loadPlaces = useCallback(async () => {
        await dispatch(actions.fetchPlaces())
    }, [dispatch])

    useEffect(() => {
        loadPlaces()
        setOpenVisited(false)
        setOpenUnvisited(false)
    }, [loadPlaces])

    const openCloseVisitedList = () => {
        if (!openVisited) {
            setOpenVisited(true)
            setOpenUnvisited(false)
        } else {
            setOpenVisited(false)
        }
    }

    const openCloseUnvisitedList = () => {
        if (!openUnvisited) {
            setOpenUnvisited(true)
            setOpenVisited(false)
        } else {
            setOpenUnvisited(false)
        }
    }

    const filteredVisitedPlaces = places.filter(element => visitedPlaces.map(pl => pl.plId).includes(element.id))

    const filteredUnvisitedPlaces = places.filter(element => !visitedPlaces.map(pl => pl.plId).includes(element.id))

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Moje konto</Text>

            <UserScreenButton onSelect={openCloseUnvisitedList}>Nieodwiedzone miejsca</UserScreenButton>
            {
                openUnvisited &&
                <View style={styles.insideListContainer}>
                    <FlatList
                        data={filteredUnvisitedPlaces}
                        keyExtractor={item => item.id}
                        renderItem={placeData => (
                            <UserPlaceItem
                                title={placeData.item.title}
                                image={placeData.item.image}
                                onSelect={() => {
                                    props.navigation.navigate('SinglePlace', {
                                        placeId: placeData.item.plId,
                                        placeName: placeData.item.title
                                    })
                                }}
                            />
                        )}
                    />
                </View>
            }

            <UserScreenButton onSelect={openCloseVisitedList}>Odwiedzone miejsca</UserScreenButton>
            {
                openVisited &&
                <View style={styles.insideListContainer}>
                    <FlatList
                        data={filteredVisitedPlaces}
                        keyExtractor={item => item.id}
                        renderItem={placeData => (
                            <UserPlaceItem
                                title={placeData.item.title}
                                image={placeData.item.image}
                                onSelect={() => {
                                    props.navigation.navigate('SinglePlace', {
                                        placeId: placeData.item.plId,
                                        placeName: placeData.item.title
                                    })
                                }}
                            />
                        )}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',

    },
    insideListContainer: {
        maxHeight: 425,
    },
    title: {
        fontSize: 28,
        marginVertical: 15,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 1,
        color: Colors.mainColor,
        fontFamily: 'roundulliard',

    },
    visitedOrUnvisitedPlacesContainer: {
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

export const userAccountOptions = navData => {
    return {
        headerTitle: 'Konto',
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

export default UserScreen