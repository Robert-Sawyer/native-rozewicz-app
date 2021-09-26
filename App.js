import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import Thunk from 'redux-thunk'
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";
import authReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigator";
import placesReducer from "./store/reducers/places";

const rootReducer = combineReducers({
    auth: authReducer,
    places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

const fetchFonts = () => {
    return (
        Font.loadAsync({
            'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
            'reenie-beanie': require('./assets/fonts/ReenieBeanie-Regular.ttf'),
            'allura': require('./assets/fonts/Allura-Regular.ttf'),
            'roundulliard': require('./assets/fonts/Rondouillard.otf')
        })
    )
}

export default function App() {

    const [fontsLoaded, setFontsLoaded] = useState(false)

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => {
                    setFontsLoaded(true)
                }}
                onError={console.warn}
            />
        )
    }
  return (
      <Provider store={store}>
          <AppNavigator/>
      </Provider>
  );
}
