import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import caseCube from "./js/reducers";

import App from "./js/components/App/App";
import "./styles/bootstrap/bootstrap.scss"
import "./styles/main.scss";

let store = createStore(caseCube, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,

document.getElementById('root'));
