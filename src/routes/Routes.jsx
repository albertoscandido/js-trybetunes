import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
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
