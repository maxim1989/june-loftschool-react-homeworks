import React, { Component } from 'react';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from '../PrivateRoute';
import TradeOperations from '../TradeOperations';
import Auth from '../Auth';
import {
  getIsAuthorized
  // , getLoginError, getRegistationError
} from '../../../modules/Auth';

import './AppRouter.css';

class AppRouter extends Component {
  onSubmit = ({ email, password }) => {
    console.log('AppRouter onSubmit');
    console.log('email =', email);
    console.log('password =', password);
  };

  render() {
    const { isAuthorized } = this.props;

    return (
      <div className="Main">
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Auth {...props} onSubmit={this.onSubmit} />}
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
    }
    // dispatch => {}
  )(AppRouter)
);
