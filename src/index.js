import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import {ThemeProvider} from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import appointments from './store/reducers/reducer';
import App from './App';
import {GlobalStyle,defaultTheme} from './utills';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(appointments,composeEnhancers());


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>  
        <GlobalStyle/>
        <ThemeProvider theme={defaultTheme}>      
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
