import { DELETE_PLACE, FETCH_PLACES, SET_PLACE_AS_VISITED } from "../actions/places"
import VisitedPlace from "../../models/visitedPlace";

const initialState = {
    visitedPlaces: [],
}

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACE_AS_VISITED:
            const newVisitedPlace = new VisitedPlace(
                action.visitedPlaceData.objId,
                action.visitedPlaceData.plId,
                action.visitedPlaceData.title
            )
            return {
                visitedPlaces: [...state.visitedPlaces, ...newVisitedPlace]
            }
        case FETCH_PLACES:
            return {
                visitedPlaces: action.visitedPlaces,
        }
        case DELETE_PLACE:
            return {
                visitedPlaces: state.visitedPlaces.filter(place => place.objId !== action.objId),
            }

    }
    return state
}

export default placesReducer