import React, { Component } from 'react';
import '../styles/login.css';
import PropTypes from 'prop-types';
import { Loading } from '../components';
import {
  createUser,
} from '../services/userAPI';
import { ReactComponent as MusicImage } from '../svg/music.svg';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      loading: false,
      loginIsDisabled: true,
    };

    this.submitLogin = this.submitLogin.bind(this);
    this.handleInputLoginChange = this.handleInputLoginChange.bind(this);
  }

  handleInputLoginChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const minLoginNick = 3;
      if (value.length >= minLoginNick) this.setState({ loginIsDisabled: false });
      else this.setState({ loginIsDisabled: true });
    });
  }

  async submitLogin() {
    const { loggingIn } = this.props;
    const { loginName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({ loading: false }, () => loggingIn());
  }

  render() {
    const {
      loading,
      loginIsDisabled,
    } = this.state;

    return (
      <div data-testid="page-login" className="page-login">
        <div className="logo">
          <div className="flex-r g-05">
            <h1>trybe</h1>
            <MusicImage className="music-image" />
          </div>
          <h2>tunes</h2>
        </div>
        <div className="form-login">
          <input
            type="text"
            data-testid="login-name-input"
            name="loginName"
            onChange={ this.handleInputLoginChange }
            placeholder="Enter your name"
          />
          <button
            type="button"
            disabled={ loginIsDisabled }
            data-testid="login-submit-button"
            onClick={ this.submitLogin }
          >
            Entrar
          </button>
        </div>
        { loading ? (
          <Loading />
        ) : null }
      </div>
    );
  }
}

Login.propTypes = {
  loggingIn: PropTypes.func.isRequired,
};
