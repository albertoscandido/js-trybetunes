import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import {
  createUser,
} from '../services/userAPI';

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
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          name="loginName"
          onChange={ this.handleInputLoginChange }
        />
        <button
          type="button"
          disabled={ loginIsDisabled }
          data-testid="login-submit-button"
          onClick={ this.submitLogin }
        >
          Entrar
        </button>
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
