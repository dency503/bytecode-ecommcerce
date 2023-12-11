import AppRouter from "./routes/AppRouter";

import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import "./App.css";

const App = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate  persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

App.propTypes = {
  store: PropTypes.any.isRequired,
  persistor: PropTypes.any.isRequired
};
export default App;
