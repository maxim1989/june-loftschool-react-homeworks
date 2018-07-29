import React, { Component } from 'react';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from '../PrivateRoute';
import TradeOperations from '../TradeOperations';
import Auth from '../Auth';
import {
  getIsAuthorized,
  registration,
  authorizeRequest
  // , getLoginError, getRegistationError
} from '../../../modules/Auth';

import './AppRouter.css';

class AppRouter extends Component {
  onRegistrationSubmit = ({ email, password }) => {
    const { registration } = this.props;

    registration({ email, password });
  };

  onEnterSubmit = ({ email, password }) => {
    console.log('onEnterSubmit');
    console.log('email=', email);
    console.log('password=', password);
    const { authorizeRequest } = this.props;

    authorizeRequest({ email, password });
  };

  render() {
    const { isAuthorized } = this.props;

    return (
      <div className="Main">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Auth
                {...props}
                onRegistrationSubmit={this.onRegistrationSubmit}
                onEnterSubmit={this.onEnterSubmit}
              />
            )}
          />
          <PrivateRoute
            isAuthorized={isAuthorized}
            path="/profile"
            component={TradeOperations}
          />
          <Redirect to="/profile" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => {
      return {
        isAuthorized: getIsAuthorized(state)
        // loginErrorReducer: getLoginError(state),
        // registationError: getRegistationError(state)
      };
    },
    dispatch => {
      return {
        registration: payload => dispatch(registration(payload)),
        authorizeRequest: payload => dispatch(authorizeRequest(payload))
      };
    }
  )(AppRouter)
);
