import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import Particles from 'react-particles-js';

import particlesParams from './particles-params';
import AppRouter from './views/components/AppRouter';

const store = createStore({
  auth: {
    isAuthorized: false,
    loginError: null,
    registationError: null
  }
  //   network: {
  //     error: null,
  //     message: null
  //   },
  //   users: {
  //     data: null,
  //     error: null,
  //     isFetched: false,
  //     isFetching: false
  //   },
  //   followers: {
  //     ids: [],
  //     error: null,
  //     isFetched: false,
  //     isFetching: false
  //   }
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.Fragment>
        <AppRouter />
        <Particles className="Particles" params={particlesParams} />
      </React.Fragment>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
