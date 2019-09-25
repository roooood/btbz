import React from 'react';
import Router from './Router.js';
import Snack from './component/Snack'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import './assets/css/App.css';
var EventEmitter = require('events')
window.ee = new EventEmitter();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  }
  renderLoading() {
    return null;
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <Snack />
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}


export default App;
