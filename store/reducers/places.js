import {SET_PLACES} from "../actions/places";

const initialState = {
    places: [],
}

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                places: action.places
            }
    }
    return state
}

export default placesReducer