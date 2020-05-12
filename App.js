import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
// import {composeWithDevTools} from 'redux-devtools-extension';

import contactsReducer from './store/reducers/contacts';
import favoritesReducer from './store/reducers/favorites';
import OverviewNavigator from './navigation/OverviewNavigator';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  favorites: favoritesReducer
});

// const store = createStore(rootReducer, composeWithDevTools()); // remove composeWithDevTools before deployment
const store = createStore(rootReducer); // remove composeWithDevTools before deployment

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => {
        setFontLoaded(true);
      }}
    />
  }

  return (
    <Provider store={store}>
      <OverviewNavigator />
    </Provider>
  );
}

