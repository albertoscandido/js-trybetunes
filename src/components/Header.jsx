import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ userName: name });
  }

  render() {
    const {
      userName,
    } = this.state;

    return (
      <header data-testid="header-component">
        { userName ? (
          <h2 data-testid="header-user-name">{userName}</h2>
        ) : <Loading />}
      </header>
    );
  }
}
