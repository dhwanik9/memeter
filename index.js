import React from 'react';
import  { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import './index.css';
import rootReducer from "./reducers/rootReducer";
import './components/AuthenticationComponents/AuthenticationComponents.css';
import './components/AppComponents/AppComponents.css';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById("root"),
);