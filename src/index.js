import React from 'react';
import ReactDOM from 'react-dom';
import {createGlobalStyle} from 'styled-components';
import { createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import appointments from './store/reducers/reducer';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(appointments,composeEnhancers());

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>  
      <GlobalStyle/>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
