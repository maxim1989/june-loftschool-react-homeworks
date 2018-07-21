import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import Particles from 'react-particles-js';

import particlesParams from './particles-params';

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
      {/* <div>TEST</div> */}
      <Particles params={particlesParams} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
