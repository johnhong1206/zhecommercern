import React from 'react';
import type {Node} from 'react';
import AppScreen from './src/screen/AppScreen';

//redux
import {Provider} from 'react-redux';
import store from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
let persistor = persistStore(store);

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
