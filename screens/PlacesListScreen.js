import React, {useState, useEffect, useCallback} from "react";
import {FlatList, View, Text, Button, ActivityIndicator, Platform, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useDispatch, useSelector} from "react-redux";
import PlaceItem from "../components/PlaceItem";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from '../constants/colors'

const PlacesListScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()
    const places = useSelector(state => state.places.places)
    const dispatch = useDispatch()

    const loadPlaces = useCallback(async () => {
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(placesActions.fetchPlaces())
        } catch (error) {
            setError(error.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadPlaces)

        return () => {
            unsubscribe()
        }
    }, [loadPlaces])

    useEffect(() => {
        setIsLoading(true)
        loadPlaces().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadPlaces])

    const renderPlaceItem = itemData => {
        return (
            <PlaceItem
                title='tytuł'
                imgHeight={'50%'}
                detailsHeight={'25%'}
                actionHeight={2}
            />
        )
    }

    // if (error) {
    //     return (
    //         <View>
    //             <Text>Cos poszło nie tak!</Text>
    //         </View>
    //     )
    // }

    // if (!isLoading && places.length === 0) {
    //     return (
    //         <View>
    //             <Text>Nie znaleziono miejsc</Text>
    //         </View>
    //     )
    // }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title='Przełącz na mapę' color={Colors.mainColor} onPress={() => {
                    props.navigation.navigate('Map')
                }}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Dodawanie miejsca' color={Colors.mainColor} onPress={() => {
                    props.navigation.navigate('NewPlace')
                }}/>
            </View>
            <FlatList
                onRefresh={loadPlaces}
                refreshing={isRefreshing}
                data={places}
                keyExtractor={item => item.id}
                renderItem={renderPlaceItem}
                numColumns={2}
            />
        </View>
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
    container: {},
    buttonContainer: {
        width: '100%',
        marginVertical: 10,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default PlacesListScreen