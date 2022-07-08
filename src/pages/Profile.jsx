import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Loading } from '../components';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          !user && <Loading />
        }
        {
          user && (
            <div>
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
              <Link to="/profile/edit"><button type="button">Editar perfil</button></Link>
              <h2>{ user.name }</h2>
              <h4>{ user.email }</h4>
              <p>{ user.description }</p>
            </div>
          )
        }
      </div>
    );
  }
}
