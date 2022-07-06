import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Album,
  Favorites,
  Login,
  NotFound,
  Profile,
  ProfileEdit,
  Search,
} from '../pages';

export default class Routes extends React.Component {
  render() {
    const {
      isLoggedIn,
      loggingIn,
    } = this.props;
    return (
      <Switch>
        <Route exact path="/">
          {
            isLoggedIn ? <Redirect to="/search" /> : <Login loggingIn={ loggingIn } />
          }
        </Route>
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route path="/" component={ NotFound } />
      </Switch>
    );
  }
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loggingIn: PropTypes.func.isRequired,
};
