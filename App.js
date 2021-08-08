import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import Thunk from 'redux-thunk'
import authReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigator";
import placesReducer from "./store/reducers/places";

const rootReducer = combineReducers({
    auth: authReducer,
    places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(Thunk))

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Hello1</Text>
    // </View>
      <Provider store={store}>
          <AppNavigator/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
