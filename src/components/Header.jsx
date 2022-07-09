import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { ReactComponent as UserDefaultImage } from '../svg/user.svg';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      image: '',
    };
  }

  async componentDidMount() {
    const { name, image } = await getUser();
    this.setState({ userName: name, image });
  }

  render() {
    const { location } = this.props;
    const {
      userName,
      image,
    } = this.state;
    return (
      <header className="header" data-testid="header-component">
        <div className="flex-r-between">
          <h1>TrybeTunes</h1>
          { userName ? (
            <div className="profile">
              { image ? (
                <img src={ image } alt={ userName } />
              ) : (
                <UserDefaultImage className="profile-default-photo" />
              )}
              <h2 data-testid="header-user-name">{userName}</h2>
            </div>
          ) : <Loading />}
        </div>
        <div className="flex-r-around ">
          <Link
            to="/search"
            data-testid="link-to-search"
            className={ `btn-header ${location === '/search' ? 'active' : ''}` }
          >
            search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className={ `btn-header ${location === '/favorites' ? 'active' : ''}` }
          >
            favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className={ `btn-header ${location === '/profile' ? 'active' : ''}` }
          >
            profile
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.string,
};

Header.defaultProps = {
  location: '',
};
