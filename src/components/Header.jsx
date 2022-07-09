import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { ReactComponent as UserDefaultImage } from '../svg/user.svg';
import { ReactComponent as MusicImage } from '../svg/music.svg';

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
        <div className="flex-r-between header-info">
          <div className="logo">
            <div className="flex-r g-05">
              <h1>trybe</h1>
              <MusicImage className="music-image" />
            </div>
            <h2>tunes</h2>
          </div>
          { userName ? (
            <div className="profile">
              { image ? (
                <img src={ image } alt={ userName } className="profile-image" />
              ) : (
                <UserDefaultImage className="profile-default-image" />
              )}
              <h2 data-testid="header-user-name">{userName}</h2>
            </div>
          ) : <Loading />}
        </div>
        <div className="flex-r-around header-options">
          <Link
            to="/search"
            data-testid="link-to-search"
            className={ `btn-header ${location === 'search' ? 'active' : ''}` }
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className={ `btn-header ${location === 'favorites' ? 'active' : ''}` }
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className={ `btn-header ${location === 'profile' ? 'active' : ''}` }
          >
            Profile
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
