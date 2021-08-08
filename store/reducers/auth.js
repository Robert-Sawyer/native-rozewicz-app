import {AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTOLOGIN} from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
        case SET_DID_TRY_AUTOLOGIN:
        case LOGOUT:
        default: return state
    }
}

export default authReducer