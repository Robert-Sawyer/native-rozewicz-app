import React, {useState, useEffect, useCallback} from "react";
import {FlatList, View, Text, Button, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import PlaceItem from "../components/PlaceItem";
import Colors from '../constants/colors'
import {set} from "react-native-reanimated";

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

    if (error) {
        return (
            <View>
                <Text>Cos poszło nie tak!</Text>
            </View>
        )
    }

    if (!isLoading && places.length === 0) {
        return (
            <View>
                <Text>Nie znalezioo miejsc</Text>
            </View>
        )
    }

    return (
        <FlatList
        onRefresh={loadPlaces}
        refreshing={isRefreshing}
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderPlaceItem}
        numColumns={2}
        />
    )
}

export default PlacesListScreen