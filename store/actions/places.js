import VisitedPlace from "../../models/visitedPlace";

export const SET_PLACE_AS_VISITED = 'SET_PLACE_AS_VISITED'
export const FETCH_PLACES = 'FETCH_PLACES'
export const DELETE_PLACE = 'DELETE_PLACE'

export const setPlaceAsVisited = (visitedPlace) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        console.log('token', token)
        const response = await fetch(`https://rozewicz-fik-app-default-rtdb.europe-west1.firebasedatabase.app/visitedPlaces/${userId}.json?auth=${token}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({visitedPlace})
        })
        if (!response.ok) {
            const errorResData = await response.json()

            console.log('error', errorResData)
            throw new Error('Coś poszło nie tak!')
        }
        const resData = await response.json()

        console.log('tutaj jest response',resData)

        dispatch({
            type: SET_PLACE_AS_VISITED,
            visitedPlaceData: {objId: resData.name, placeId: resData.name.visitedPlace.id, title: resData.name.visitedPlace.placeName}
        })
    }
}

export const fetchPlaces = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(`https://rozewicz-fik-app-default-rtdb.europe-west1.firebasedatabase.app/visitedPlaces/${userId}.json`)

            if (!response.ok) {
                throw new Error('Coś poszło nie tak! Spróbuj jeszcze raz.')
            }

            const resData = await response.json()
            const loadedPlaces = []

            for (const key in resData) {
                loadedPlaces.push(
                    new VisitedPlace(
                        key,
                        resData[key].visitedPlace.id,
                        resData[key].visitedPlace.placeName
                ))
            }
            dispatch({type: FETCH_PLACES, visitedPlaces: loadedPlaces})
        } catch (e) {
            throw e
        }
    }
}

export const deletePlace = placeId => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const token = getState().auth.token
        const response = await fetch(
            `https://rozewicz-fik-app-default-rtdb.europe-west1.firebasedatabase.app/visitedPlaces/${userId}/${placeId}.json?auth=${token}`, {
                method: 'delete',
            })
        if (!response.ok) {
            throw new Error('Coś poszło nie tak!')
        }
        dispatch({type: DELETE_PLACE, objId: placeId})
    }
}